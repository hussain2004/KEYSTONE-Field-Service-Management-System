package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.dispatch.DispatchResponse;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class DispatchService {

    private final WorkOrderRepository workOrderRepository;

    public List<DispatchResponse> getDispatchQueue() {

        return workOrderRepository.findAll()
                .stream()
                .filter(workOrder ->
                        workOrder.getStatus() == WorkOrderStatus.NEW
                                || workOrder.getStatus() == WorkOrderStatus.ASSIGNED
                                || workOrder.getStatus() == WorkOrderStatus.IN_PROGRESS
                                || workOrder.getStatus() == WorkOrderStatus.ON_HOLD
                )
                .sorted(
                        Comparator
                                .comparing(
                                        WorkOrder::getPriority,
                                        Comparator.nullsLast(
                                                Comparator.naturalOrder()
                                        )
                                )
                                .reversed()
                                .thenComparing(
                                        WorkOrder::getScheduledDate,
                                        Comparator.nullsLast(
                                                Comparator.naturalOrder()
                                        )
                                )
                )
                .map(this::mapToResponse)
                .toList();
    }

    public Map<String, List<DispatchResponse>> getKanbanBoard() {

        Map<String, List<DispatchResponse>> board =
                new LinkedHashMap<>();

        board.put("NEW", getByStatus(WorkOrderStatus.NEW));
        board.put("ASSIGNED", getByStatus(WorkOrderStatus.ASSIGNED));
        board.put("IN_PROGRESS", getByStatus(WorkOrderStatus.IN_PROGRESS));
        board.put("ON_HOLD", getByStatus(WorkOrderStatus.ON_HOLD));
        board.put("COMPLETED", getByStatus(WorkOrderStatus.COMPLETED));
        board.put("CLOSED", getByStatus(WorkOrderStatus.CLOSED));
        board.put("CANCELLED", getByStatus(WorkOrderStatus.CANCELLED));

        return board;
    }

    private List<DispatchResponse> getByStatus(
            WorkOrderStatus status) {

        return workOrderRepository
                .findByStatus(status)
                .stream()
                .sorted(
                        Comparator.comparing(
                                WorkOrder::getScheduledDate,
                                Comparator.nullsLast(
                                        Comparator.naturalOrder()
                                )
                        )
                )
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
                .priority(
                        workOrder.getPriority() != null
                                ? workOrder.getPriority().name()
                                : null
                )
                .scheduledDate(
                        workOrder.getScheduledDate() != null
                                ? workOrder.getScheduledDate().toString()
                                : null
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