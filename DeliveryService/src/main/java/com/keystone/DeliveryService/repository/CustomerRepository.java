package com.keystone.DeliveryService.repository;

import com.keystone.DeliveryService.entity.Customer;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    boolean existsByEmail(String email);

    Page<Customer> findByCustomerNameContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(
            String customerName,
            String companyName,
            Pageable pageable
    );
}