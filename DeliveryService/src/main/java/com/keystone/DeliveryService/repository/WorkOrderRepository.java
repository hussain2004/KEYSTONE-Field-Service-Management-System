package com.keystone.DeliveryService.repository;

import com.keystone.DeliveryService.entity.WorkOrder;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import com.keystone.DeliveryService.enums.WorkOrderStatus;



@Repository
public interface WorkOrderRepository extends JpaRepository<WorkOrder, Long> {

    List<WorkOrder> findTop5ByOrderByIdDesc();

    boolean existsBySiteId(Long siteId);
    List<WorkOrder> findByStatus(WorkOrderStatus status);

    List<WorkOrder> findByTechnicianId(Long technicianId);
    long countByStatus(WorkOrderStatus status);

}