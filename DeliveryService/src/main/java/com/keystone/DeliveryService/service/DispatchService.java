package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.dispatch.DispatchResponse;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DispatchService {

    private final WorkOrderRepository workOrderRepository;

    public List<DispatchResponse> getDispatchQueue() {

        return workOrderRepository
                .findByStatus(WorkOrderStatus.OPEN)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private DispatchResponse mapToResponse(
            WorkOrder workOrder) {

        return DispatchResponse.builder()
                .workOrderId(workOrder.getId())
                .workOrderCode(workOrder.getWorkOrderCode())
                .title(workOrder.getTitle())
                .status(workOrder.getStatus())
                .priority(workOrder.getPriority().name())
                .scheduledDate(
                        workOrder.getScheduledDate() == null
                                ? null
                                : workOrder.getScheduledDate().toString()
                )
                .technicianId(
                        workOrder.getTechnician() != null
                                ? workOrder.getTechnician().getId()
                                : null
                )
                .technicianName(
                        workOrder.getTechnician() != null
                                ? workOrder.getTechnician().getTechnicianName()
                                : null
                )
                .build();
    }
}