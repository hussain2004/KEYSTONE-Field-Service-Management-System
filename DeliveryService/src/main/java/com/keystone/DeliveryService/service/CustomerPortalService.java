package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.customerportal.CustomerPortalRequest;
import com.keystone.DeliveryService.dto.workorder.WorkOrderResponse;
import com.keystone.DeliveryService.entity.Customer;
import com.keystone.DeliveryService.entity.Site;
import com.keystone.DeliveryService.entity.StatusHistory;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.CustomerRepository;
import com.keystone.DeliveryService.repository.SiteRepository;
import com.keystone.DeliveryService.repository.StatusHistoryRepository;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
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
public class CustomerPortalService {

    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final WorkOrderRepository workOrderRepository;
    private final StatusHistoryRepository statusHistoryRepository;

    @Transactional(readOnly = true)
    public List<Site> getMySites() {

        Customer customer = getCurrentCustomer();

        return siteRepository.findByCustomerId(customer.getId());
    }

    @Transactional(readOnly = true)
    public List<WorkOrderResponse> getMyWorkOrders() {

        Customer customer = getCurrentCustomer();

        return workOrderRepository
                .findByCustomerId(customer.getId())
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public WorkOrderResponse getMyWorkOrder(Long id) {

        Customer customer = getCurrentCustomer();

        WorkOrder workOrder =
                workOrderRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Work order not found"
                                ));

        requireOwnership(workOrder, customer);

        return mapToResponse(workOrder);
    }

    @Transactional(readOnly = true)
    public List<StatusHistory> getMyWorkOrderHistory(Long id) {

        Customer customer = getCurrentCustomer();

        WorkOrder workOrder =
                workOrderRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Work order not found"
                                ));

        requireOwnership(workOrder, customer);

        return statusHistoryRepository
                .findByWorkOrderIdOrderByChangedAtAsc(id);
    }

    public WorkOrderResponse createRequest(
            CustomerPortalRequest request) {

        Customer customer = getCurrentCustomer();

        Site site =
                siteRepository.findById(request.getSiteId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Site not found"
                                ));

        if (!site.getCustomer().getId().equals(customer.getId())) {
            throw new AccessDeniedException(
                    "You can only create requests for your own sites"
            );
        }

        WorkOrder workOrder =
                WorkOrder.builder()
                        .workOrderCode("TEMP")
                        .title(request.getTitle())
                        .description(request.getDescription())
                        .priority(request.getPriority())
                        .status(WorkOrderStatus.NEW)
                        .scheduledDate(request.getScheduledDate())
                        .startTime(null)
                        .endTime(null)
                        .slaDueDate(
                                calculateSlaDueDate(
                                        request.getPriority()
                                )
                        )
                        .slaBreached(false)
                        .customer(customer)
                        .site(site)
                        .technician(null)
                        .build();

        WorkOrder saved =
                workOrderRepository.save(workOrder);

        saved.setWorkOrderCode(
                String.format("WO-%06d", saved.getId())
        );

        saved =
                workOrderRepository.save(saved);

        return mapToResponse(saved);
    }

    private Customer getCurrentCustomer() {

        String email = currentUsername();

        return customerRepository
                .findByEmail(email)
                .orElseThrow(() ->
                        new AccessDeniedException(
                                "Customer profile not found"
                        ));
    }

    private void requireOwnership(
            WorkOrder workOrder,
            Customer customer) {

        if (workOrder.getCustomer() == null ||
                !workOrder.getCustomer()
                        .getId()
                        .equals(customer.getId())) {

            throw new AccessDeniedException(
                    "You can only access your own work orders"
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

        WorkOrderResponse response =
                new WorkOrderResponse();

        response.setId(workOrder.getId());
        response.setWorkOrderCode(
                workOrder.getWorkOrderCode()
        );
        response.setTitle(workOrder.getTitle());
        response.setDescription(
                workOrder.getDescription()
        );
        response.setPriority(workOrder.getPriority());
        response.setStatus(workOrder.getStatus());
        response.setScheduledDate(
                workOrder.getScheduledDate()
        );
        response.setStartTime(
                workOrder.getStartTime()
        );
        response.setEndTime(
                workOrder.getEndTime()
        );
        response.setSlaDueDate(
                workOrder.getSlaDueDate()
        );
        response.setSlaBreached(
                workOrder.getSlaBreached()
        );

        if (workOrder.getCustomer() != null) {
            response.setCustomerId(
                    workOrder.getCustomer().getId()
            );

            response.setCustomerName(
                    workOrder.getCustomer()
                            .getCustomerName()
            );
        }

        if (workOrder.getSite() != null) {
            response.setSiteId(
                    workOrder.getSite().getId()
            );

            response.setSiteName(
                    workOrder.getSite().getSiteName()
            );
        }

        if (workOrder.getTechnician() != null) {
            response.setTechnicianId(
                    workOrder.getTechnician().getId()
            );

            response.setTechnicianName(
                    workOrder.getTechnician()
                            .getTechnicianName()
            );
        }

        return response;
    }
}