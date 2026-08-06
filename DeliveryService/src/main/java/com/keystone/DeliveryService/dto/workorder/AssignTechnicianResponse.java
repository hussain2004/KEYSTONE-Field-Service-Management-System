package com.keystone.DeliveryService.dto.workorder;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssignTechnicianResponse {

    private Long workOrderId;

    private String workOrderCode;

    private Long technicianId;

    private String technicianName;

    private String status;
}