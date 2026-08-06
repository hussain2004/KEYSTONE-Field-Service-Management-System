package com.keystone.DeliveryService.dto.workorder;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class AssignTechnicianRequest {

    @NotNull(message = "Technician ID is required")
    private Long technicianId;

}