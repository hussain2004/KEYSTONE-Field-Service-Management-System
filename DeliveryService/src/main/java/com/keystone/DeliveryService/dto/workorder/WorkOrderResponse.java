package com.keystone.DeliveryService.dto.workorder;

import com.keystone.DeliveryService.enums.Priority;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
public class WorkOrderResponse {

    private Long id;

    private String workOrderCode;

    private String title;

    private String description;

    private Priority priority;

    private WorkOrderStatus status;

    private LocalDate scheduledDate;

    private LocalDateTime startTime;

    private LocalDateTime endTime;
    private LocalDateTime slaDueDate;

    private Boolean slaBreached;

    private Long customerId;

    private String customerName;

    private Long siteId;

    private String siteName;

    private Long technicianId;

    private String technicianName;
}