package com.keystone.DeliveryService.dto.workorder;

import com.keystone.DeliveryService.enums.Priority;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class WorkOrderRequest {

    @NotBlank(message = "Title is required")
    private String title;

    private String description;

    @NotNull(message = "Priority is required")
    private Priority priority;

    @NotNull(message = "Scheduled date is required")
    private LocalDate scheduledDate;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
    private LocalDateTime slaDueDate;

    @NotNull(message = "Customer ID is required")
    private Long customerId;

    @NotNull(message = "Site ID is required")
    private Long siteId;

    private Long technicianId;
}