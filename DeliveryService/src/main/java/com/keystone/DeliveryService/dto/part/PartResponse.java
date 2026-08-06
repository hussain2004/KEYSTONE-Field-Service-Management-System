package com.keystone.DeliveryService.dto.part;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartResponse {

    private Long id;

    private String partName;

    private String partCode;

    private Double unitPrice;

    private Integer stockQuantity;
}