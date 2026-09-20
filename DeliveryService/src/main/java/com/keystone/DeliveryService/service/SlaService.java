package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.entity.Technician;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class SlaService {

    private final WorkOrderRepository workOrderRepository;
    private final NotificationService notificationService;

    private static final List<WorkOrderStatus> TERMINAL_STATUSES = List.of(
            WorkOrderStatus.COMPLETED,
            WorkOrderStatus.CLOSED,
            WorkOrderStatus.CANCELLED
    );

    @Scheduled(fixedDelay = 300000)
    public void scheduledSlaCheck() {
        checkSla();
    }

    public int checkSla() {

        LocalDateTime now = LocalDateTime.now();

        List<WorkOrder> allWorkOrders =
                workOrderRepository.findAll();

        int breachedCount = 0;

        for (WorkOrder workOrder : allWorkOrders) {

            if (workOrder.getSlaDueDate() == null) {
                continue;
            }

            if (TERMINAL_STATUSES.contains(workOrder.getStatus())) {
                continue;
            }

            if (Boolean.TRUE.equals(workOrder.getSlaBreached())) {
                continue;
            }

            if (!workOrder.getSlaDueDate().isBefore(now)
                    && !workOrder.getSlaDueDate().isEqual(now)) {
                continue;
            }

            workOrder.setSlaBreached(true);
            workOrderRepository.save(workOrder);

            breachedCount++;

            String message =
                    "SLA breached for work order "
                            + workOrder.getWorkOrderCode()
                            + ".";

            notifyTechnician(workOrder, message);

            notificationService.createManagerSlaNotification(
                    workOrder,
                    message
            );
        }

        return breachedCount;
    }

    @Transactional(readOnly = true)
    public List<WorkOrder> getBreachedWorkOrders() {

        return workOrderRepository
                .findBySlaBreachedTrueAndStatusNotIn(
                        TERMINAL_STATUSES
                );
    }

    @Transactional(readOnly = true)
    public List<WorkOrder> getAtRiskWorkOrders() {

        LocalDateTime now = LocalDateTime.now();

        return workOrderRepository
                .findBySlaDueDateBetweenAndSlaBreachedFalseAndStatusNotIn(
                        now,
                        now.plusHours(24),
                        TERMINAL_STATUSES
                );
    }

    private void notifyTechnician(
            WorkOrder workOrder,
            String message) {

        Technician technician = workOrder.getTechnician();

        if (technician != null) {
            notificationService.createSlaNotification(
                    workOrder,
                    technician,
                    message
            );
        }
    }
}