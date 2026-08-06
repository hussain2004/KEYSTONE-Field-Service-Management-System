package com.keystone.DeliveryService.dto;

import com.keystone.DeliveryService.enums.Priority;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import lombok.Data;

@Data
public class RecentWorkOrderResponse {

    private Long id;

    private String workOrderCode;

    private String title;

    private Priority priority;

    private WorkOrderStatus status;

    private String siteName;

    private String technicianName;
}