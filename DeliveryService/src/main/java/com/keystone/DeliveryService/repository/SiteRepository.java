package com.keystone.DeliveryService.repository;

import com.keystone.DeliveryService.entity.Site;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SiteRepository extends JpaRepository<Site, Long> {

    boolean existsByCustomerId(Long customerId);

}