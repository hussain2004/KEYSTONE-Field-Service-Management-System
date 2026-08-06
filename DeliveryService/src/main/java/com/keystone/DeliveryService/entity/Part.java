package com.keystone.DeliveryService.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Entity
@Table(name = "parts")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Part {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Part name is required")
    @Column(nullable = false)
    private String partName;

    @NotBlank(message = "Part code is required")
    @Column(nullable = false, unique = true)
    private String partCode;

    @Min(value = 0, message = "Unit price cannot be negative")
    @Column(nullable = false)
    private Double unitPrice;

    @Min(value = 0, message = "Stock quantity cannot be negative")
    @Column(nullable = false)
    private Integer stockQuantity;
}