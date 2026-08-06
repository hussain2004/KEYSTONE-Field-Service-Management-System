package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.workorder.WorkOrderRequest;
import com.keystone.DeliveryService.dto.workorder.WorkOrderResponse;
import com.keystone.DeliveryService.dto.workorder.WorkOrderUpdateRequest;
import com.keystone.DeliveryService.entity.Customer;
import com.keystone.DeliveryService.entity.Site;
import com.keystone.DeliveryService.entity.Technician;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.CustomerRepository;
import com.keystone.DeliveryService.repository.SiteRepository;
import com.keystone.DeliveryService.repository.TechnicianRepository;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.keystone.DeliveryService.dto.workorder.StartWorkResponse;
import com.keystone.DeliveryService.dto.workorder.HoldWorkResponse;
import com.keystone.DeliveryService.dto.workorder.ResumeWorkResponse;
import com.keystone.DeliveryService.dto.workorder.CompleteWorkResponse;
import com.keystone.DeliveryService.dto.workorder.CloseWorkResponse;
import java.time.temporal.ChronoUnit;

import java.util.List;

@Service
@RequiredArgsConstructor
public class WorkOrderService {

    private final WorkOrderRepository workOrderRepository;
    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final TechnicianRepository technicianRepository;
    private final StatusHistoryService statusHistoryService;

    public WorkOrderResponse createWorkOrder(WorkOrderRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Customer not found with id: " + request.getCustomerId()));

        Site site = siteRepository.findById(request.getSiteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Site not found with id: " + request.getSiteId()));

        Technician technician = null;

        if (request.getTechnicianId() != null) {
            technician = technicianRepository.findById(request.getTechnicianId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Technician not found with id: " + request.getTechnicianId()));
        }

        WorkOrder workOrder = WorkOrder.builder()
                .title(request.getTitle())
                .description(request.getDescription())
                .priority(request.getPriority())
                .status(WorkOrderStatus.OPEN)
                .scheduledDate(request.getScheduledDate())
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .slaDueDate(request.getSlaDueDate())
                .slaBreached(false)
                .customer(customer)
                .site(site)
                .technician(technician)
                .build();

        WorkOrder savedWorkOrder = workOrderRepository.save(workOrder);

        savedWorkOrder.setWorkOrderCode(
                String.format("WO-%06d", savedWorkOrder.getId())
        );

        savedWorkOrder = workOrderRepository.save(savedWorkOrder);

        return mapToResponse(savedWorkOrder);
    }

    public WorkOrderResponse assignTechnician(Long workOrderId, Long technicianId) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + workOrderId));

        if (workOrder.getStatus() != WorkOrderStatus.OPEN) {
            throw new IllegalStateException(
                    "Technician can only be assigned to an OPEN Work Order.");
        }

        Technician technician = technicianRepository.findById(technicianId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Technician not found with id: " + technicianId));

        if (!Boolean.TRUE.equals(technician.getActive())) {
            throw new IllegalStateException(
                    "Technician is inactive.");
        }

        WorkOrderStatus oldStatus = workOrder.getStatus();

        workOrder.setTechnician(technician);
        workOrder.setStatus(WorkOrderStatus.ASSIGNED);

        WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

        statusHistoryService.saveStatusHistory(
                updatedWorkOrder,
                oldStatus,
                WorkOrderStatus.ASSIGNED,
                "ADMIN"
        );

        return mapToResponse(updatedWorkOrder);
    }

    private WorkOrderResponse mapToResponse(WorkOrder workOrder) {

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
        response.setCustomerId(workOrder.getCustomer().getId());
        response.setCustomerName(workOrder.getCustomer().getCustomerName());

        response.setSiteId(workOrder.getSite().getId());
        response.setSiteName(workOrder.getSite().getSiteName());

        if (workOrder.getTechnician() != null) {

            response.setTechnicianId(workOrder.getTechnician().getId());
            response.setTechnicianName(
                    workOrder.getTechnician().getTechnicianName());
        }

        return response;
    }

    public List<WorkOrderResponse> getAllWorkOrders() {
        return workOrderRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }
    public List<WorkOrderResponse> getWorkOrdersByTechnician(
            Long technicianId) {

        return workOrderRepository
                .findByTechnicianId(technicianId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public WorkOrderResponse getWorkOrderById(Long id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + id));

        return mapToResponse(workOrder);
    }

    public WorkOrderResponse updateWorkOrder(Long id, WorkOrderUpdateRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + id));

        if (workOrder.getStatus() == WorkOrderStatus.CLOSED) {
            throw new IllegalStateException(
                    "Closed Work Orders cannot be updated.");
        }

        if (workOrder.getStatus() != request.getStatus()
                && !isValidStatusTransition(
                workOrder.getStatus(),
                request.getStatus())) {

            throw new IllegalStateException(
                    "Invalid status transition from "
                            + workOrder.getStatus()
                            + " to "
                            + request.getStatus());
        }

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Customer not found with id: " + request.getCustomerId()));

        Site site = siteRepository.findById(request.getSiteId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Site not found with id: " + request.getSiteId()));

        Technician technician = null;

        if (request.getTechnicianId() != null) {
            technician = technicianRepository.findById(request.getTechnicianId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Technician not found with id: " + request.getTechnicianId()));
        }

        workOrder.setTitle(request.getTitle());
        workOrder.setDescription(request.getDescription());
        workOrder.setPriority(request.getPriority());
        workOrder.setStatus(request.getStatus());
        workOrder.setScheduledDate(request.getScheduledDate());
        workOrder.setStartTime(request.getStartTime());
        workOrder.setEndTime(request.getEndTime());
        workOrder.setCustomer(customer);
        workOrder.setSite(site);


        WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

        return mapToResponse(updatedWorkOrder);
    }

    public void deleteWorkOrder(Long id) {

        WorkOrder workOrder = workOrderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + id));

        workOrderRepository.delete(workOrder);
    }

    private boolean isValidStatusTransition(
            WorkOrderStatus currentStatus,
            WorkOrderStatus newStatus) {

        return switch (currentStatus) {

            case OPEN ->
                    newStatus == WorkOrderStatus.ASSIGNED;

            case ASSIGNED ->
                    newStatus == WorkOrderStatus.IN_PROGRESS;

            case IN_PROGRESS ->
                    newStatus == WorkOrderStatus.ON_HOLD
                            || newStatus == WorkOrderStatus.COMPLETED;

            case ON_HOLD ->
                    newStatus == WorkOrderStatus.IN_PROGRESS;

            case COMPLETED ->
                    newStatus == WorkOrderStatus.CLOSED;

            case CLOSED ->
                    false;
        };
    }
    public StartWorkResponse startWork(Long workOrderId) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + workOrderId));

        if (workOrder.getStatus() != WorkOrderStatus.ASSIGNED) {
            throw new IllegalStateException(
                    "Only ASSIGNED Work Orders can be started.");
        }

        WorkOrderStatus oldStatus = workOrder.getStatus();

        workOrder.setStatus(WorkOrderStatus.IN_PROGRESS);
        workOrder.setStartTime(java.time.LocalDateTime.now());

        WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

        statusHistoryService.saveStatusHistory(
                updatedWorkOrder,
                oldStatus,
                WorkOrderStatus.IN_PROGRESS,
                "TECHNICIAN"
        );

        return StartWorkResponse.builder()
                .workOrderId(updatedWorkOrder.getId())
                .workOrderCode(updatedWorkOrder.getWorkOrderCode())
                .status(updatedWorkOrder.getStatus().name())
                .startTime(updatedWorkOrder.getStartTime())
                .build();
    }
    public HoldWorkResponse holdWork(Long workOrderId) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + workOrderId));

        if (workOrder.getStatus() != WorkOrderStatus.IN_PROGRESS) {
            throw new IllegalStateException(
                    "Only IN_PROGRESS Work Orders can be put on hold.");
        }

        WorkOrderStatus oldStatus = workOrder.getStatus();

        workOrder.setStatus(WorkOrderStatus.ON_HOLD);

        WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

        statusHistoryService.saveStatusHistory(
                updatedWorkOrder,
                oldStatus,
                WorkOrderStatus.ON_HOLD,
                "TECHNICIAN"
        );

        return HoldWorkResponse.builder()
                .workOrderId(updatedWorkOrder.getId())
                .workOrderCode(updatedWorkOrder.getWorkOrderCode())
                .status(updatedWorkOrder.getStatus().name())
                .build();
    }
    public ResumeWorkResponse resumeWork(Long workOrderId) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + workOrderId));

        if (workOrder.getStatus() != WorkOrderStatus.ON_HOLD) {
            throw new IllegalStateException(
                    "Only ON_HOLD Work Orders can be resumed.");
        }

        WorkOrderStatus oldStatus = workOrder.getStatus();

        workOrder.setStatus(WorkOrderStatus.IN_PROGRESS);

        WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

        statusHistoryService.saveStatusHistory(
                updatedWorkOrder,
                oldStatus,
                WorkOrderStatus.IN_PROGRESS,
                "TECHNICIAN"
        );

        return ResumeWorkResponse.builder()
                .workOrderId(updatedWorkOrder.getId())
                .workOrderCode(updatedWorkOrder.getWorkOrderCode())
                .status(updatedWorkOrder.getStatus().name())
                .build();
    }
    public CompleteWorkResponse completeWork(Long workOrderId) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + workOrderId));

        if (workOrder.getStatus() != WorkOrderStatus.IN_PROGRESS) {
            throw new IllegalStateException(
                    "Only IN_PROGRESS Work Orders can be completed.");
        }

        WorkOrderStatus oldStatus = workOrder.getStatus();

        workOrder.setStatus(WorkOrderStatus.COMPLETED);
        workOrder.setEndTime(java.time.LocalDateTime.now());
        if (workOrder.getSlaDueDate() != null &&
                workOrder.getEndTime().isAfter(workOrder.getSlaDueDate())) {

            workOrder.setSlaBreached(true);

        }

        WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

        statusHistoryService.saveStatusHistory(
                updatedWorkOrder,
                oldStatus,
                WorkOrderStatus.COMPLETED,
                "TECHNICIAN"
        );

        return CompleteWorkResponse.builder()
                .workOrderId(updatedWorkOrder.getId())
                .workOrderCode(updatedWorkOrder.getWorkOrderCode())
                .status(updatedWorkOrder.getStatus().name())
                .endTime(updatedWorkOrder.getEndTime())
                .build();
    }
    public CloseWorkResponse closeWork(Long workOrderId) {

        WorkOrder workOrder = workOrderRepository.findById(workOrderId)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + workOrderId));

        if (workOrder.getStatus() != WorkOrderStatus.COMPLETED) {
            throw new IllegalStateException(
                    "Only COMPLETED Work Orders can be closed.");
        }

        WorkOrderStatus oldStatus = workOrder.getStatus();

        workOrder.setStatus(WorkOrderStatus.CLOSED);

        WorkOrder updatedWorkOrder = workOrderRepository.save(workOrder);

        statusHistoryService.saveStatusHistory(
                updatedWorkOrder,
                oldStatus,
                WorkOrderStatus.CLOSED,
                "ADMIN"
        );

        return CloseWorkResponse.builder()
                .workOrderId(updatedWorkOrder.getId())
                .workOrderCode(updatedWorkOrder.getWorkOrderCode())
                .status(updatedWorkOrder.getStatus().name())
                .build();
    }

}