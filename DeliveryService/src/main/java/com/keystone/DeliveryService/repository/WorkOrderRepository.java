package com.keystone.DeliveryService.repository;

import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

    List<WorkOrder> findTop5ByOrderByIdDesc();

    boolean existsBySiteId(Long siteId);

    List<WorkOrder> findByStatus(WorkOrderStatus status);

    List<WorkOrder> findByTechnicianId(Long technicianId);

    long countByStatus(WorkOrderStatus status);

    List<WorkOrder> findBySlaDueDateBeforeAndSlaBreachedFalseAndStatusNotIn(
            LocalDateTime dateTime,
            List<WorkOrderStatus> excludedStatuses
    );

    List<WorkOrder> findBySlaDueDateBetweenAndStatusNotIn(
            LocalDateTime start,
            LocalDateTime end,
            List<WorkOrderStatus> excludedStatuses
    );
}