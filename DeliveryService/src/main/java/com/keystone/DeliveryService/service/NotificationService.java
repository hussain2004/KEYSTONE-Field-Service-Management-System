package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.notification.NotificationResponse;
import com.keystone.DeliveryService.entity.Notification;
import com.keystone.DeliveryService.entity.Technician;
import com.keystone.DeliveryService.entity.User;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.Role;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.NotificationRepository;
import com.keystone.DeliveryService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class NotificationService {

    private final NotificationRepository notificationRepository;
    private final UserRepository userRepository;

    public void createAssignmentNotification(
            WorkOrder workOrder,
            Technician technician) {

        Notification notification = Notification.builder()
                .technician(technician)
                .workOrder(workOrder)
                .message(
                        "Work order "
                                + workOrder.getWorkOrderCode()
                                + " has been assigned to you."
                )
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    public void createSlaNotification(
            WorkOrder workOrder,
            Technician technician,
            String message) {

        Notification notification = Notification.builder()
                .technician(technician)
                .workOrder(workOrder)
                .message(message)
                .read(false)
                .createdAt(LocalDateTime.now())
                .build();

        notificationRepository.save(notification);
    }

    public void createManagerSlaNotification(
            WorkOrder workOrder,
            String message) {

        List<User> managers =
                userRepository.findAll()
                        .stream()
                        .filter(user ->
                                user.getRole() == Role.MANAGER
                                        && Boolean.TRUE.equals(user.getActive())
                        )
                        .toList();

        for (User manager : managers) {

            Notification notification = Notification.builder()
                    .user(manager)
                    .workOrder(workOrder)
                    .message(message)
                    .read(false)
                    .createdAt(LocalDateTime.now())
                    .build();

            notificationRepository.save(notification);
        }
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> getMyNotifications() {

        requireTechnician();

        String email = currentUsername();

        return notificationRepository
                .findByTechnician_EmailIgnoreCaseOrderByCreatedAtDesc(email)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> getMyUnreadNotifications() {

        requireTechnician();

        String email = currentUsername();

        return notificationRepository
                .findByTechnician_EmailIgnoreCaseAndReadFalseOrderByCreatedAtDesc(
                        email
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> getManagerNotifications() {

        requireManager();

        String email = currentUsername();

        return notificationRepository
                .findByUser_EmailIgnoreCaseOrderByCreatedAtDesc(email)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public List<NotificationResponse> getManagerUnreadNotifications() {

        requireManager();

        String email = currentUsername();

        return notificationRepository
                .findByUser_EmailIgnoreCaseAndReadFalseOrderByCreatedAtDesc(
                        email
                )
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void markAsRead(Long notificationId) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new AccessDeniedException(
                    "Authentication required"
            );
        }

        String email = authentication.getName();

        Notification notification =
                notificationRepository.findById(notificationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification not found"
                                ));

        boolean technicianOwner =
                notification.getTechnician() != null
                        && notification.getTechnician()
                        .getEmail()
                        .equalsIgnoreCase(email);

        boolean managerOwner =
                notification.getUser() != null
                        && notification.getUser()
                        .getEmail()
                        .equalsIgnoreCase(email);

        if (!technicianOwner && !managerOwner) {

            throw new AccessDeniedException(
                    "You can only access your own notifications"
            );
        }

        notification.setRead(true);

        notificationRepository.save(notification);
    }

    public void markAllAsRead() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new AccessDeniedException(
                    "Authentication required"
            );
        }

        String email = authentication.getName();

        if (hasRole("TECHNICIAN")) {

            List<Notification> notifications =
                    notificationRepository
                            .findByTechnician_EmailIgnoreCaseAndReadFalseOrderByCreatedAtDesc(
                                    email
                            );

            notifications.forEach(notification ->
                    notification.setRead(true)
            );

            notificationRepository.saveAll(notifications);

            return;
        }

        if (hasRole("MANAGER")) {

            List<Notification> notifications =
                    notificationRepository
                            .findByUser_EmailIgnoreCaseAndReadFalseOrderByCreatedAtDesc(
                                    email
                            );

            notifications.forEach(notification ->
                    notification.setRead(true)
            );

            notificationRepository.saveAll(notifications);

            return;
        }

        throw new AccessDeniedException(
                "Only technicians and managers can access notifications"
        );
    }

    private NotificationResponse mapToResponse(
            Notification notification) {

        WorkOrder workOrder = notification.getWorkOrder();

        return NotificationResponse.builder()
                .id(notification.getId())
                .workOrderId(workOrder.getId())
                .workOrderCode(workOrder.getWorkOrderCode())
                .message(notification.getMessage())
                .read(notification.getRead())
                .createdAt(notification.getCreatedAt())
                .build();
    }

    private void requireTechnician() {

        if (!hasRole("TECHNICIAN")) {

            throw new AccessDeniedException(
                    "Only technicians can access notifications"
            );
        }
    }

    private void requireManager() {

        if (!hasRole("MANAGER")) {

            throw new AccessDeniedException(
                    "Only managers can access notifications"
            );
        }
    }

    private boolean hasRole(String role) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        return authentication != null
                && authentication.isAuthenticated()
                && authentication.getAuthorities()
                .stream()
                .anyMatch(authority ->
                        authority.getAuthority()
                                .equals("ROLE_" + role)
                );
    }

    private String currentUsername() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            throw new AccessDeniedException(
                    "Authentication required"
            );
        }

        return authentication.getName();
    }
}