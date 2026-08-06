package com.keystone.DeliveryService.dto;

import lombok.Data;

@Data
public class SiteResponse {

    private Long id;

    private String siteName;

    private String address;

    private String city;

    private String state;

    private String country;

    private String postalCode;

    private Long customerId;

    private String customerName;
}