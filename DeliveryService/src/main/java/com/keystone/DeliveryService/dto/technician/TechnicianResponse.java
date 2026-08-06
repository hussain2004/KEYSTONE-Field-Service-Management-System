package com.keystone.DeliveryService.dto.technician;

import lombok.Data;

@Data
public class TechnicianResponse {

    private Long id;

    private String technicianName;

    private String email;

    private String phoneNumber;

    private String specialization;

    private Boolean active;
}