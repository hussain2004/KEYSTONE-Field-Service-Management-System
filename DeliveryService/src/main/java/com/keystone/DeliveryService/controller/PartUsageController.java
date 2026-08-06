package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.partusage.PartUsageRequest;
import com.keystone.DeliveryService.dto.partusage.PartUsageResponse;
import com.keystone.DeliveryService.service.PartUsageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/part-usage")
@RequiredArgsConstructor
public class PartUsageController {

    private final PartUsageService partUsageService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PartUsageResponse createPartUsage(
            @Valid @RequestBody PartUsageRequest request) {

        return partUsageService.createPartUsage(request);
    }

    @GetMapping
    public List<PartUsageResponse> getAllPartUsage() {

        return partUsageService.getAllPartUsage();
    }

    @GetMapping("/work-order/{workOrderId}")
    public List<PartUsageResponse> getPartUsageByWorkOrder(
            @PathVariable Long workOrderId) {

        return partUsageService.getByWorkOrder(workOrderId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePartUsage(
            @PathVariable Long id) {

        partUsageService.deletePartUsage(id);
    }
}