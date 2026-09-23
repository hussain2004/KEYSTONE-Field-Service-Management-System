package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.customerportal.CustomerPortalRequest;
import com.keystone.DeliveryService.dto.workorder.WorkOrderResponse;
import com.keystone.DeliveryService.entity.Site;
import com.keystone.DeliveryService.entity.StatusHistory;
import com.keystone.DeliveryService.service.CustomerPortalService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customer-portal")
@RequiredArgsConstructor
public class CustomerPortalController {

    private final CustomerPortalService customerPortalService;

    @GetMapping("/sites")
    public ResponseEntity<List<Site>> getMySites() {
        return ResponseEntity.ok(
                customerPortalService.getMySites()
        );
    }

    @GetMapping("/work-orders")
    public ResponseEntity<List<WorkOrderResponse>> getMyWorkOrders() {
        return ResponseEntity.ok(
                customerPortalService.getMyWorkOrders()
        );
    }

    @GetMapping("/work-orders/{id}")
    public ResponseEntity<WorkOrderResponse> getMyWorkOrder(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                customerPortalService.getMyWorkOrder(id)
        );
    }

    @GetMapping("/work-orders/{id}/history")
    public ResponseEntity<List<StatusHistory>> getMyWorkOrderHistory(
            @PathVariable Long id) {

        return ResponseEntity.ok(
                customerPortalService.getMyWorkOrderHistory(id)
        );
    }

    @PostMapping("/work-orders")
    public ResponseEntity<WorkOrderResponse> createRequest(
            @Valid @RequestBody CustomerPortalRequest request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(
                        customerPortalService.createRequest(request)
                );
    }
}