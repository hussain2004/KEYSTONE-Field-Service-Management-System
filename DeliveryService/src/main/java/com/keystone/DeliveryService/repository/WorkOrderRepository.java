package com.keystone.DeliveryService.repository;

import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkOrderRepository
        extends JpaRepository<WorkOrder, Long> {

    List<WorkOrder> findTop5ByOrderByIdDesc();

    List<WorkOrder> findByStatus(
            WorkOrderStatus status
    );

    List<WorkOrder> findByTechnicianId(
            Long technicianId
    );

    List<WorkOrder> findByCustomerId(
            Long customerId
    );

    boolean existsBySiteId(
            Long siteId
    );

    long countByStatus(
            WorkOrderStatus status
    );

    List<WorkOrder>
    findBySlaDueDateBeforeAndSlaBreachedFalseAndStatusNotIn(
            LocalDateTime dateTime,
            List<WorkOrderStatus> statuses
    );

    List<WorkOrder>
    findBySlaDueDateLessThanEqualAndSlaBreachedFalseAndStatusNotIn(
            LocalDateTime dateTime,
            List<WorkOrderStatus> statuses
    );

    List<WorkOrder>
    findBySlaBreachedTrueAndStatusNotIn(
            List<WorkOrderStatus> statuses
    );

    List<WorkOrder>
    findBySlaDueDateBetweenAndSlaBreachedFalseAndStatusNotIn(
            LocalDateTime start,
            LocalDateTime end,
            List<WorkOrderStatus> statuses
    );
}