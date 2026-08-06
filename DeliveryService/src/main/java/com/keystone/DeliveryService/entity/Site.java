package com.keystone.DeliveryService.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "sites")
@Data
public class Site {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String siteName;

    private String address;

    private String city;

    private String state;

    private String country;

    private String postalCode;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;
}