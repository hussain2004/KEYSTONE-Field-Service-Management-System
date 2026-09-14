package com.keystone.DeliveryService.dto.notification;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NotificationResponse {

    private Long id;

    private Long workOrderId;

    private String workOrderCode;

    private String message;

    private Boolean read;

    private LocalDateTime createdAt;
}