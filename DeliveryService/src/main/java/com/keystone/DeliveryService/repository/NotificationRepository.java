package com.keystone.DeliveryService.repository;

import com.keystone.DeliveryService.entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NotificationRepository
        extends JpaRepository<Notification, Long> {

    List<Notification> findByTechnician_EmailIgnoreCaseOrderByCreatedAtDesc(
            String email
    );

    List<Notification> findByTechnician_EmailIgnoreCaseAndReadFalseOrderByCreatedAtDesc(
            String email
    );

    List<Notification> findByUser_EmailIgnoreCaseOrderByCreatedAtDesc(
            String email
    );

    List<Notification> findByUser_EmailIgnoreCaseAndReadFalseOrderByCreatedAtDesc(
            String email
    );
}