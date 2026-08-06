package com.keystone.DeliveryService.dto.timelog;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TimeLogResponse {

    private Long id;

    private Long workOrderId;
    private String workOrderTitle;

    private Long technicianId;
    private String technicianName;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private Double hoursWorked;

    private String remarks;
}