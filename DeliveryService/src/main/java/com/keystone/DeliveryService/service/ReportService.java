package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.report.DashboardReportResponse;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import com.keystone.DeliveryService.repository.CustomerRepository;
import com.keystone.DeliveryService.repository.SiteRepository;
import com.keystone.DeliveryService.repository.TechnicianRepository;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final TechnicianRepository technicianRepository;
    private final WorkOrderRepository workOrderRepository;

    public DashboardReportResponse getDashboardReport() {

        return DashboardReportResponse.builder()
                .totalCustomers(customerRepository.count())
                .totalSites(siteRepository.count())
                .totalTechnicians(technicianRepository.count())
                .totalWorkOrders(workOrderRepository.count())
                .openWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.NEW))
                .assignedWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.ASSIGNED))
                .inProgressWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.IN_PROGRESS))
                .onHoldWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.ON_HOLD))
                .completedWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.COMPLETED))
                .closedWorkOrders(workOrderRepository.countByStatus(WorkOrderStatus.CLOSED))
                .build();
    }
}