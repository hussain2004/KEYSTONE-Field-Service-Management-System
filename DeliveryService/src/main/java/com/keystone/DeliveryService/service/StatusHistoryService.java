package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.workorder.StatusHistoryResponse;
import com.keystone.DeliveryService.entity.StatusHistory;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import com.keystone.DeliveryService.repository.StatusHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StatusHistoryService {

    private final StatusHistoryRepository statusHistoryRepository;

    public void saveStatusHistory(
            WorkOrder workOrder,
            WorkOrderStatus oldStatus,
            WorkOrderStatus newStatus,
            String changedBy) {

        StatusHistory history = StatusHistory.builder()
                .workOrder(workOrder)
                .oldStatus(oldStatus)
                .newStatus(newStatus)
                .changedAt(LocalDateTime.now())
                .changedBy(changedBy)
                .build();

        statusHistoryRepository.save(history);
    }

    public List<StatusHistoryResponse> getHistory(Long workOrderId) {

        return statusHistoryRepository.findByWorkOrderIdOrderByChangedAtAsc(workOrderId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private StatusHistoryResponse mapToResponse(StatusHistory history) {

        return StatusHistoryResponse.builder()
                .id(history.getId())
                .oldStatus(history.getOldStatus())
                .newStatus(history.getNewStatus())
                .changedAt(history.getChangedAt())
                .changedBy(history.getChangedBy())
                .build();
    }
}