package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.ActivityResponse;
import com.keystone.DeliveryService.dto.DashboardResponse;
import com.keystone.DeliveryService.dto.RecentWorkOrderResponse;
import com.keystone.DeliveryService.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<DashboardResponse> getDashboardStats() {

        return ResponseEntity.ok(
                dashboardService.getDashboardStats()
        );
    }

    @GetMapping("/recent-work-orders")
    public ResponseEntity<List<RecentWorkOrderResponse>> getRecentWorkOrders() {

        return ResponseEntity.ok(
                dashboardService.getRecentWorkOrders()
        );
    }

    @GetMapping("/todays-activity")
    public ResponseEntity<List<ActivityResponse>> getTodaysActivity() {

        return ResponseEntity.ok(
                dashboardService.getTodaysActivity()
        );
    }
}