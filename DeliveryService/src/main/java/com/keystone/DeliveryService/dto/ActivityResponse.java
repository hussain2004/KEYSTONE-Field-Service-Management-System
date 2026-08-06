package com.keystone.DeliveryService.dto;

import com.keystone.DeliveryService.enums.WorkOrderStatus;
import lombok.Data;

@Data
public class ActivityResponse {

    private String workOrderCode;

    private String title;

    private WorkOrderStatus status;
}