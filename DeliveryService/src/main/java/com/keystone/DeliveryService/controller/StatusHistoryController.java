package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.workorder.StatusHistoryResponse;
import com.keystone.DeliveryService.service.StatusHistoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workorders")
@RequiredArgsConstructor
public class StatusHistoryController {

    private final StatusHistoryService statusHistoryService;

    @GetMapping("/{workOrderId}/history")
    public List<StatusHistoryResponse> getHistory(
            @PathVariable Long workOrderId) {

        return statusHistoryService.getHistory(workOrderId);
    }
}