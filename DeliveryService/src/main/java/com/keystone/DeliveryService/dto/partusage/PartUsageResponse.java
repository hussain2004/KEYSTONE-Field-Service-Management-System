package com.keystone.DeliveryService.dto.partusage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartUsageResponse {

    private Long id;

    private Long workOrderId;

    private String workOrderTitle;

    private Long partId;

    private String partName;

    private Integer quantityUsed;
}