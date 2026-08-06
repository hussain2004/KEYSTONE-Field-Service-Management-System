package com.keystone.DeliveryService.repository;

import com.keystone.DeliveryService.entity.StatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {

    List<StatusHistory> findByWorkOrderIdOrderByChangedAtAsc(Long workOrderId);

}