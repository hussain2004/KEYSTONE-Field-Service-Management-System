package com.keystone.DeliveryService.dto.workorder;

import com.keystone.DeliveryService.enums.Priority;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkOrderUpdateRequest {

    private String title;

    private String description;

    private Priority priority;

    private WorkOrderStatus status;

    private LocalDate scheduledDate;

    private LocalDateTime startTime;

    private LocalDateTime endTime;

    private LocalDateTime slaDueDate;

    private Long customerId;

    private Long siteId;

    private Long technicianId;
}