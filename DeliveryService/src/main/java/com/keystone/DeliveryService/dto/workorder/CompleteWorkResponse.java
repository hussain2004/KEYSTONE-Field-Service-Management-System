package com.keystone.DeliveryService.dto.workorder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompleteWorkResponse {

    private Long workOrderId;

    private String workOrderCode;

    private String status;

    private LocalDateTime endTime;
}