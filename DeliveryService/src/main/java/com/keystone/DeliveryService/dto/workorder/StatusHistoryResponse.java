package com.keystone.DeliveryService.dto.workorder;

import com.keystone.DeliveryService.enums.WorkOrderStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatusHistoryResponse {

    private Long id;

    private WorkOrderStatus oldStatus;

    private WorkOrderStatus newStatus;

    private LocalDateTime changedAt;

    private String changedBy;
}