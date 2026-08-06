package com.keystone.DeliveryService.repository;

import com.keystone.DeliveryService.entity.TimeLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeLogRepository
        extends JpaRepository<TimeLog, Long> {

    List<TimeLog> findByWorkOrderId(Long workOrderId);

    List<TimeLog> findByTechnicianId(Long technicianId);
}