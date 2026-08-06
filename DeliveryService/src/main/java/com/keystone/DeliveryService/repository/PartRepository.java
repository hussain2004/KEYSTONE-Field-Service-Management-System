package com.keystone.DeliveryService.repository;

import com.keystone.DeliveryService.entity.Part;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PartRepository extends JpaRepository<Part, Long> {

    Optional<Part> findByPartCode(String partCode);

    boolean existsByPartCode(String partCode);
}