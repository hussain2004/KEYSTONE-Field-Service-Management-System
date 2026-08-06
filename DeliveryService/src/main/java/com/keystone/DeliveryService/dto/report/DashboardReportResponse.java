package com.keystone.DeliveryService.dto.report;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DashboardReportResponse {

    private Long totalCustomers;

    private Long totalSites;

    private Long totalTechnicians;

    private Long totalWorkOrders;

    private Long openWorkOrders;

    private Long assignedWorkOrders;

    private Long inProgressWorkOrders;

    private Long onHoldWorkOrders;

    private Long completedWorkOrders;

    private Long closedWorkOrders;
}