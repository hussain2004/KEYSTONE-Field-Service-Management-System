package com.keystone.DeliveryService.dto.part;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PartRequest {

    @NotBlank(message = "Part name is required")
    private String partName;

    @NotBlank(message = "Part code is required")
    private String partCode;

    @Min(value = 0, message = "Unit price cannot be negative")
    private Double unitPrice;

    @Min(value = 0, message = "Stock quantity cannot be negative")
    private Integer stockQuantity;
}