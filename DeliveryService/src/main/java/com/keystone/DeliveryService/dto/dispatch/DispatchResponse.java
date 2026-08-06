package com.keystone.DeliveryService.dto.dispatch;

import com.keystone.DeliveryService.enums.WorkOrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DispatchResponse {

    private Long workOrderId;

    private String workOrderCode;

    private String title;

    private String technicianName;

    private Long technicianId;

    private WorkOrderStatus status;

    private String priority;

    private String scheduledDate;
}