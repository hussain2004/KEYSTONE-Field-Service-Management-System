package com.keystone.DeliveryService.entity;

import com.keystone.DeliveryService.enums.Priority;
import com.keystone.DeliveryService.enums.WorkOrderStatus;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "work_orders")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WorkOrder {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String workOrderCode;

    @Column(nullable = false)
    private String title;

    @Column(length = 1000)
    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Priority priority;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private WorkOrderStatus status;

    @Column(nullable = false)
    private LocalDate scheduledDate;
    @Column
    private LocalDateTime startTime;

    @Column
    private LocalDateTime endTime;
    @Column
    private LocalDateTime slaDueDate;

    @Column
    private Boolean slaBreached = false;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "site_id", nullable = false)
    private Site site;
    @ManyToOne
    @JoinColumn(name = "technician_id")
    private Technician technician;


}