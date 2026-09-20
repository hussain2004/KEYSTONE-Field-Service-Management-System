package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.notification.NotificationResponse;
import com.keystone.DeliveryService.service.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {

    private final NotificationService notificationService;

    @GetMapping("/my")
    public List<NotificationResponse> getMyNotifications() {
        return notificationService.getMyNotifications();
    }

    @GetMapping("/my/unread")
    public List<NotificationResponse> getMyUnreadNotifications() {
        return notificationService.getMyUnreadNotifications();
    }

    @GetMapping("/manager")
    public List<NotificationResponse> getManagerNotifications() {
        return notificationService.getManagerNotifications();
    }

    @GetMapping("/manager/unread")
    public List<NotificationResponse> getManagerUnreadNotifications() {
        return notificationService.getManagerUnreadNotifications();
    }

    @PutMapping("/{id}/read")
    public void markAsRead(@PathVariable Long id) {
        notificationService.markAsRead(id);
    }

    @PutMapping("/my/read-all")
    public void markAllAsRead() {
        notificationService.markAllAsRead();
    }
}