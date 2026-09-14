package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.dispatch.DispatchResponse;
import com.keystone.DeliveryService.service.DispatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/dispatch")
@RequiredArgsConstructor
public class DispatchController {

    private final DispatchService dispatchService;

    @GetMapping("/queue")
    public List<DispatchResponse> getDispatchQueue() {
        return dispatchService.getDispatchQueue();
    }

    @GetMapping("/kanban")
    public Map<String, List<DispatchResponse>> getKanbanBoard() {
        return dispatchService.getKanbanBoard();
    }
}