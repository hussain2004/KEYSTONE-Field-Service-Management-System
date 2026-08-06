package com.keystone.DeliveryService.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerResponse {

    private Long id;

    private String customerName;

    private String companyName;

    private String email;

    private String phoneNumber;

    private String address;

    private Boolean active;
}