package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.timelog.TimeLogRequest;
import com.keystone.DeliveryService.dto.timelog.TimeLogResponse;
import com.keystone.DeliveryService.service.TimeLogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/time-logs")
@RequiredArgsConstructor
public class TimeLogController {

    private final TimeLogService timeLogService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TimeLogResponse createTimeLog(
            @Valid @RequestBody TimeLogRequest request) {

        return timeLogService.createTimeLog(request);
    }

    @GetMapping
    public List<TimeLogResponse> getAllTimeLogs() {

        return timeLogService.getAllTimeLogs();
    }

    @GetMapping("/work-order/{workOrderId}")
    public List<TimeLogResponse> getTimeLogsByWorkOrder(
            @PathVariable Long workOrderId) {

        return timeLogService.getByWorkOrder(workOrderId);
    }

    @GetMapping("/technician/{technicianId}")
    public List<TimeLogResponse> getTimeLogsByTechnician(
            @PathVariable Long technicianId) {

        return timeLogService.getByTechnician(technicianId);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTimeLog(
            @PathVariable Long id) {

        timeLogService.deleteTimeLog(id);
    }
}