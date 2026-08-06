package com.keystone.DeliveryService.dto.technician;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class TechnicianRequest {

    @NotBlank(message = "Technician name is required")
    private String technicianName;

    @Email(message = "Invalid email format")
    @NotBlank(message = "Email is required")
    private String email;

    @NotBlank(message = "Phone number is required")
    private String phoneNumber;

    @NotBlank(message = "Specialization is required")
    private String specialization;

    @NotNull(message = "Active status is required")
    private Boolean active;
}