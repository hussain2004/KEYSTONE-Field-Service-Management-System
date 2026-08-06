package com.keystone.DeliveryService.dto.timelog;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimeLogRequest {

    @NotNull(message = "Work Order is required")
    private Long workOrderId;

    @NotNull(message = "Technician is required")
    private Long technicianId;

    @NotNull(message = "Start Time is required")
    private LocalDateTime startTime;

    @NotNull(message = "End Time is required")
    private LocalDateTime endTime;

    @NotNull(message = "Hours Worked is required")
    private Double hoursWorked;

    @NotBlank(message = "Remarks are required")
    private String remarks;
}