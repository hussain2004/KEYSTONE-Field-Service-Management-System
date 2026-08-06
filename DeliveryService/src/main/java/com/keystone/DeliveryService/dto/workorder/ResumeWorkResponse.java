package com.keystone.DeliveryService.dto.workorder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResumeWorkResponse {

    private Long workOrderId;

    private String workOrderCode;

    private String status;
}