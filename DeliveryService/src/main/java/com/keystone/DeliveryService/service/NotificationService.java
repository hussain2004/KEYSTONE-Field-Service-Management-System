package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.notification.NotificationResponse;
import com.keystone.DeliveryService.entity.Notification;
import com.keystone.DeliveryService.entity.Technician;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.NotificationRepository;
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

    public void markAsRead(Long notificationId) {

        requireTechnician();

        String email = currentUsername();

        Notification notification =
                notificationRepository.findById(notificationId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Notification not found"
                                ));

        if (!notification.getTechnician()
                .getEmail()
                .equalsIgnoreCase(email)) {

            throw new AccessDeniedException(
                    "You can only access your own notifications"
            );
        }

        notification.setRead(true);

        notificationRepository.save(notification);
    }

    public void markAllAsRead() {

        requireTechnician();

        String email = currentUsername();

        List<Notification> notifications =
                notificationRepository
                        .findByTechnician_EmailIgnoreCaseAndReadFalseOrderByCreatedAtDesc(
                                email
                        );

        notifications.forEach(notification ->
                notification.setRead(true)
        );

        notificationRepository.saveAll(notifications);
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

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated() ||
                authentication.getAuthorities()
                        .stream()
                        .noneMatch(authority ->
                                authority.getAuthority()
                                        .equals("ROLE_TECHNICIAN")
                        )) {

            throw new AccessDeniedException(
                    "Only technicians can access notifications"
            );
        }
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