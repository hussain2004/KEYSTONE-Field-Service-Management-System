package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.workorder.CloseWorkResponse;
import com.keystone.DeliveryService.dto.workorder.CompleteWorkResponse;
import com.keystone.DeliveryService.dto.workorder.HoldWorkResponse;
import com.keystone.DeliveryService.dto.workorder.ResumeWorkResponse;
import com.keystone.DeliveryService.dto.workorder.StartWorkResponse;
import com.keystone.DeliveryService.dto.workorder.WorkOrderRequest;
import com.keystone.DeliveryService.dto.workorder.WorkOrderResponse;
import com.keystone.DeliveryService.dto.workorder.WorkOrderUpdateRequest;
import com.keystone.DeliveryService.entity.Customer;
import com.keystone.DeliveryService.entity.Site;
import com.keystone.DeliveryService.entity.StatusHistory;
import com.keystone.DeliveryService.entity.Technician;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.CustomerRepository;
import com.keystone.DeliveryService.repository.SiteRepository;
import com.keystone.DeliveryService.repository.StatusHistoryRepository;
import com.keystone.DeliveryService.repository.TechnicianRepository;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Service
@RequiredArgsConstructor
@Transactional
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final TechnicianRepository technicianRepository;
    private final StatusHistoryRepository statusHistoryRepository;
    private final NotificationService notificationService;

    private static final Map<WorkOrderStatus, Set<WorkOrderStatus>> ALLOWED_TRANSITIONS = Map.of(
            WorkOrderStatus.NEW,
            Set.of(WorkOrderStatus.ASSIGNED, WorkOrderStatus.CANCELLED),

            WorkOrderStatus.ASSIGNED,
            Set.of(WorkOrderStatus.IN_PROGRESS, WorkOrderStatus.CANCELLED),

            WorkOrderStatus.IN_PROGRESS,
            Set.of(
                    WorkOrderStatus.ON_HOLD,
                    WorkOrderStatus.COMPLETED,
                    WorkOrderStatus.CANCELLED
            ),

            WorkOrderStatus.ON_HOLD,
            Set.of(
                    WorkOrderStatus.IN_PROGRESS,
                    WorkOrderStatus.CANCELLED
            ),

            WorkOrderStatus.COMPLETED,
            Set.of(WorkOrderStatus.CLOSED),

            WorkOrderStatus.CLOSED,
            Set.of(),

            WorkOrderStatus.CANCELLED,
            Set.of()
    );

    public WorkOrderResponse createWorkOrder(WorkOrderRequest request) {

        Customer customer =
                customerRepository.findById(request.getCustomerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Customer not found"));

        Site site =
                siteRepository.findById(request.getSiteId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Site not found"));

        Technician technician = null;

        if (request.getTechnicianId() != null) {
            technician =
                    technicianRepository.findById(request.getTechnicianId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException("Technician not found"));

            if (!Boolean.TRUE.equals(technician.getActive())) {
                throw new IllegalStateException("Technician is inactive");
            }
        }

        LocalDateTime slaDueDate = request.getSlaDueDate();

        if (slaDueDate == null) {
            slaDueDate = calculateSlaDueDate(request.getPriority());
        }

        WorkOrder workOrder =
                WorkOrder.builder()
                        .workOrderCode("TEMP")
                        .title(request.getTitle())
                        .description(request.getDescription())
                        .priority(request.getPriority())
                        .status(
                                technician == null
                                        ? WorkOrderStatus.NEW
                                        : WorkOrderStatus.ASSIGNED
                        )
                        .scheduledDate(request.getScheduledDate())
                        .startTime(request.getStartTime())
                        .endTime(request.getEndTime())
                        .slaDueDate(slaDueDate)
                        .slaBreached(false)
                        .customer(customer)
                        .site(site)
                        .technician(technician)
                        .build();

        WorkOrder saved = workOrderRepository.save(workOrder);

        saved.setWorkOrderCode(
                String.format("WO-%06d", saved.getId())
        );

        saved = workOrderRepository.save(saved);

        if (technician != null) {
            notificationService.createAssignmentNotification(
                    saved,
                    technician
            );
        }

        return mapToResponse(saved);
    }

    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getAllWorkOrders() {

        if (hasRole("TECHNICIAN")) {

            Technician technician = getCurrentTechnician();

            return workOrderRepository
                    .findByTechnicianId(technician.getId())
                    .stream()
                    .map(this::mapToResponse)
                    .toList();
        }

        if (hasRole("MANAGER") || hasRole("DISPATCHER")) {

            return workOrderRepository
                    .findAll()
                    .stream()
                    .map(this::mapToResponse)
                    .toList();
        }

        throw new AccessDeniedException(
                "You are not allowed to view work orders"
        );
    }

    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getWorkOrdersByTechnician(Long technicianId) {

        if (hasRole("TECHNICIAN")) {

            Technician currentTechnician = getCurrentTechnician();

            if (!currentTechnician.getId().equals(technicianId)) {
                throw new AccessDeniedException(
                        "You can only access your own assigned work orders"
                );
            }
        }

        if (!hasAnyRole("MANAGER", "DISPATCHER", "TECHNICIAN")) {
            throw new AccessDeniedException(
                    "You are not allowed to view technician work orders"
            );
        }

        technicianRepository.findById(technicianId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found"));

        return workOrderRepository
                .findByTechnicianId(technicianId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public WorkOrderResponse getWorkOrderById(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        if (hasRole("TECHNICIAN")) {
            requireAssignedTechnician(workOrder);
        }

        return mapToResponse(workOrder);
    }

    public WorkOrderResponse updateWorkOrder(
            Long id,
            WorkOrderUpdateRequest request) {

        WorkOrder workOrder = getWorkOrder(id);

        if (hasRole("TECHNICIAN")) {
            throw new AccessDeniedException(
                    "Technicians cannot edit work orders"
            );
        }

        if (workOrder.getStatus() == WorkOrderStatus.CLOSED ||
                workOrder.getStatus() == WorkOrderStatus.CANCELLED) {

            throw new IllegalStateException(
                    "Closed or cancelled work orders cannot be updated"
            );
        }

        Customer customer =
                customerRepository.findById(request.getCustomerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Customer not found"));

        Site site =
                siteRepository.findById(request.getSiteId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Site not found"));

        Technician oldTechnician = workOrder.getTechnician();
        Technician technician = null;

        if (request.getTechnicianId() != null) {

            technician =
                    technicianRepository.findById(request.getTechnicianId())
                            .orElseThrow(() ->
                                    new ResourceNotFoundException("Technician not found"));

            if (!Boolean.TRUE.equals(technician.getActive())) {
                throw new IllegalStateException("Technician is inactive");
            }
        }

        WorkOrderStatus oldStatus = workOrder.getStatus();
        WorkOrderStatus newStatus = request.getStatus();

        if (oldStatus != newStatus) {
            validateTransition(oldStatus, newStatus);
        }

        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setPriority(request.getPriority());
        workOrder.setScheduledDate(request.getScheduledDate());
        workOrder.setStartTime(request.getStartTime());
        workOrder.setEndTime(request.getEndTime());
        workOrder.setCustomer(customer);
        workOrder.setSite(site);
        workOrder.setTechnician(technician);

        LocalDateTime slaDueDate = request.getSlaDueDate();

        if (slaDueDate == null) {
            slaDueDate = calculateSlaDueDate(request.getPriority());
        }

        workOrder.setSlaDueDate(slaDueDate);
        workOrder.setSlaBreached(
                slaDueDate.isBefore(LocalDateTime.now())
                        && !isTerminalStatus(newStatus)
        );

        workOrder.setStatus(newStatus);

        WorkOrder saved = workOrderRepository.save(workOrder);

        if (oldStatus != newStatus) {
            saveHistory(
                    saved,
                    oldStatus,
                    newStatus,
                    currentUsername()
            );
        }

        boolean technicianChanged =
                technician != null &&
                        (oldTechnician == null ||
                                !oldTechnician.getId().equals(technician.getId()));

        if (technicianChanged) {
            notificationService.createAssignmentNotification(
                    saved,
                    technician
            );
        }

        return mapToResponse(saved);
    }

    public WorkOrderResponse assignTechnician(
            Long id,
            Long technicianId) {

        WorkOrder workOrder = getWorkOrder(id);

        Technician technician =
                technicianRepository.findById(technicianId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException("Technician not found"));

        if (!Boolean.TRUE.equals(technician.getActive())) {
            throw new IllegalStateException("Technician is inactive");
        }

        WorkOrderStatus oldStatus = workOrder.getStatus();

        if (oldStatus != WorkOrderStatus.NEW &&
                oldStatus != WorkOrderStatus.ASSIGNED) {

            throw new IllegalStateException(
                    "Technician can only be assigned to NEW or ASSIGNED work orders"
            );
        }

        Technician oldTechnician = workOrder.getTechnician();

        boolean technicianChanged =
                oldTechnician == null ||
                        !oldTechnician.getId().equals(technician.getId());

        workOrder.setTechnician(technician);
        workOrder.setStatus(WorkOrderStatus.ASSIGNED);

        WorkOrder saved = workOrderRepository.save(workOrder);

        if (oldStatus != WorkOrderStatus.ASSIGNED) {
            saveHistory(
                    saved,
                    oldStatus,
                    WorkOrderStatus.ASSIGNED,
                    currentUsername()
            );
        }

        if (technicianChanged) {
            notificationService.createAssignmentNotification(
                    saved,
                    technician
            );
        }

        return mapToResponse(saved);
    }

    public StartWorkResponse startWork(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        requireTechnicianActionPermission(workOrder);

        transition(workOrder, WorkOrderStatus.IN_PROGRESS);

        return StartWorkResponse.builder()
                .workOrderId(workOrder.getId())
                .workOrderCode(workOrder.getWorkOrderCode())
                .status(workOrder.getStatus().name())
                .startTime(workOrder.getStartTime())
                .build();
    }

    public HoldWorkResponse holdWork(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        requireTechnicianActionPermission(workOrder);

        transition(workOrder, WorkOrderStatus.ON_HOLD);

        return HoldWorkResponse.builder()
                .workOrderId(workOrder.getId())
                .workOrderCode(workOrder.getWorkOrderCode())
                .status(workOrder.getStatus().name())
                .build();
    }

    public ResumeWorkResponse resumeWork(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        requireTechnicianActionPermission(workOrder);

        transition(workOrder, WorkOrderStatus.IN_PROGRESS);

        return ResumeWorkResponse.builder()
                .workOrderId(workOrder.getId())
                .workOrderCode(workOrder.getWorkOrderCode())
                .status(workOrder.getStatus().name())
                .build();
    }

    public CompleteWorkResponse completeWork(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        requireTechnicianActionPermission(workOrder);

        transition(workOrder, WorkOrderStatus.COMPLETED);

        return CompleteWorkResponse.builder()
                .workOrderId(workOrder.getId())
                .workOrderCode(workOrder.getWorkOrderCode())
                .status(workOrder.getStatus().name())
                .endTime(workOrder.getEndTime())
                .build();
    }

    public CloseWorkResponse closeWork(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        if (!hasAnyRole("MANAGER", "DISPATCHER")) {
            throw new AccessDeniedException(
                    "Only managers or dispatchers can close work orders"
            );
        }

        transition(workOrder, WorkOrderStatus.CLOSED);

        return CloseWorkResponse.builder()
                .workOrderId(workOrder.getId())
                .workOrderCode(workOrder.getWorkOrderCode())
                .status(workOrder.getStatus().name())
                .build();
    }

    public WorkOrderResponse cancelWorkOrder(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        if (!hasAnyRole("MANAGER", "DISPATCHER")) {
            throw new AccessDeniedException(
                    "Only managers or dispatchers can cancel work orders"
            );
        }

        transition(workOrder, WorkOrderStatus.CANCELLED);

        return mapToResponse(workOrder);
    }

    public void deleteWorkOrder(Long id) {

        WorkOrder workOrder = getWorkOrder(id);

        if (!hasRole("MANAGER")) {
            throw new AccessDeniedException(
                    "Only managers can delete work orders"
            );
        }

        workOrderRepository.delete(workOrder);
    }

    private void transition(
            WorkOrder workOrder,
            WorkOrderStatus newStatus) {

        WorkOrderStatus oldStatus = workOrder.getStatus();

        validateTransition(oldStatus, newStatus);

        workOrder.setStatus(newStatus);

        if (newStatus == WorkOrderStatus.IN_PROGRESS &&
                workOrder.getStartTime() == null) {

            workOrder.setStartTime(LocalDateTime.now());
        }

        if (newStatus == WorkOrderStatus.COMPLETED &&
                workOrder.getEndTime() == null) {

            workOrder.setEndTime(LocalDateTime.now());
        }

        WorkOrder saved = workOrderRepository.save(workOrder);

        saveHistory(
                saved,
                oldStatus,
                newStatus,
                currentUsername()
        );
    }

    private void validateTransition(
            WorkOrderStatus oldStatus,
            WorkOrderStatus newStatus) {

        if (oldStatus == newStatus) {
            return;
        }

        Set<WorkOrderStatus> allowed =
                ALLOWED_TRANSITIONS.getOrDefault(
                        oldStatus,
                        Set.of()
                );

        if (!allowed.contains(newStatus)) {
            throw new IllegalStateException(
                    "Invalid work order status transition from "
                            + oldStatus
                            + " to "
                            + newStatus
            );
        }
    }

    private void requireTechnicianActionPermission(
            WorkOrder workOrder) {

        if (hasRole("TECHNICIAN")) {
            requireAssignedTechnician(workOrder);
            return;
        }

        if (!hasAnyRole("MANAGER", "DISPATCHER")) {
            throw new AccessDeniedException(
                    "You are not allowed to perform this action"
            );
        }
    }

    private void requireAssignedTechnician(
            WorkOrder workOrder) {

        if (workOrder.getTechnician() == null) {
            throw new AccessDeniedException(
                    "Work order is not assigned to a technician"
            );
        }

        String currentUser = currentUsername();

        if (!workOrder.getTechnician()
                .getEmail()
                .equalsIgnoreCase(currentUser)) {

            throw new AccessDeniedException(
                    "You can only access work orders assigned to you"
            );
        }
    }

    private Technician getCurrentTechnician() {

        String email = currentUsername();

        return technicianRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new AccessDeniedException(
                                "Technician profile not found"
                        ));
    }

    private WorkOrder getWorkOrder(Long id) {

        return workOrderRepository
                .findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work order not found"
                        ));
    }

    private void saveHistory(
            WorkOrder workOrder,
            WorkOrderStatus oldStatus,
            WorkOrderStatus newStatus,
            String changedBy) {

        StatusHistory history =
                StatusHistory.builder()
                        .workOrder(workOrder)
                        .oldStatus(oldStatus)
                        .newStatus(newStatus)
                        .changedAt(LocalDateTime.now())
                        .changedBy(changedBy)
                        .build();

        statusHistoryRepository.save(history);
    }

    private String currentUsername() {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        if (authentication == null ||
                !authentication.isAuthenticated()) {

            return "SYSTEM";
        }

        return authentication.getName();
    }

    private boolean hasRole(String role) {

        Authentication authentication =
                SecurityContextHolder
                        .getContext()
                        .getAuthentication();

        return authentication != null &&
                authentication.getAuthorities()
                        .stream()
                        .anyMatch(authority ->
                                authority.getAuthority()
                                        .equals("ROLE_" + role)
                        );
    }

    private boolean hasAnyRole(String... roles) {

        for (String role : roles) {
            if (hasRole(role)) {
                return true;
            }
        }

        return false;
    }

    private boolean isTerminalStatus(WorkOrderStatus status) {

        return status == WorkOrderStatus.COMPLETED ||
                status == WorkOrderStatus.CLOSED ||
                status == WorkOrderStatus.CANCELLED;
    }

    private LocalDateTime calculateSlaDueDate(
            com.keystone.DeliveryService.enums.Priority priority) {

        int hours = switch (priority) {
            case HIGH -> 24;
            case MEDIUM -> 48;
            case LOW -> 72;
        };

        return LocalDateTime.now().plusHours(hours);
    }

    private WorkOrderResponse mapToResponse(
            WorkOrder workOrder) {

        WorkOrderResponse response = new WorkOrderResponse();

        response.setId(workOrder.getId());
        response.setWorkOrderCode(workOrder.getWorkOrderCode());
        response.setTitle(workOrder.getTitle());
        response.setDescription(workOrder.getDescription());
        response.setPriority(workOrder.getPriority());
        response.setStatus(workOrder.getStatus());
        response.setScheduledDate(workOrder.getScheduledDate());
        response.setStartTime(workOrder.getStartTime());
        response.setEndTime(workOrder.getEndTime());
        response.setSlaDueDate(workOrder.getSlaDueDate());
        response.setSlaBreached(workOrder.getSlaBreached());

        if (workOrder.getCustomer() != null) {
            response.setCustomerId(workOrder.getCustomer().getId());
            response.setCustomerName(
                    workOrder.getCustomer().getCustomerName()
            );
        }

        if (workOrder.getSite() != null) {
            response.setSiteId(workOrder.getSite().getId());
            response.setSiteName(
                    workOrder.getSite().getSiteName()
            );
        }

        if (workOrder.getTechnician() != null) {
            response.setTechnicianId(
                    workOrder.getTechnician().getId()
            );
            response.setTechnicianName(
                    workOrder.getTechnician().getTechnicianName()
            );
        }

        return response;
    }
}