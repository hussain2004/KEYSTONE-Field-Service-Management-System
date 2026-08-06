package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.dispatch.DispatchResponse;
import com.keystone.DeliveryService.service.DispatchService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dispatch")
@RequiredArgsConstructor
public class DispatchController {

    private final DispatchService dispatchService;

    @GetMapping("/queue")
    public List<DispatchResponse> getDispatchQueue() {

        return dispatchService.getDispatchQueue();
    }
}