package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.service.SlaService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/sla")
@RequiredArgsConstructor
public class SlaController {

    private final SlaService slaService;

    @GetMapping("/breached")
    @PreAuthorize("hasRole('MANAGER')")
    public List<WorkOrder> getBreachedWorkOrders() {
        slaService.checkSla();
        return slaService.getBreachedWorkOrders();
    }

    @GetMapping("/at-risk")
    @PreAuthorize("hasRole('MANAGER')")
    public List<WorkOrder> getAtRiskWorkOrders() {
        return slaService.getAtRiskWorkOrders();
    }

    @PostMapping("/check")
    @PreAuthorize("hasRole('MANAGER')")
    public String checkSla() {

        int breachedCount = slaService.checkSla();

        return "SLA check completed. "
                + breachedCount
                + " work order(s) marked as breached.";
    }
}