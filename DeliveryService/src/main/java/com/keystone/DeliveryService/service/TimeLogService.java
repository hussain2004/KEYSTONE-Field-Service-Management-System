package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.timelog.TimeLogRequest;
import com.keystone.DeliveryService.dto.timelog.TimeLogResponse;
import com.keystone.DeliveryService.entity.Technician;
import com.keystone.DeliveryService.entity.TimeLog;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.TechnicianRepository;
import com.keystone.DeliveryService.repository.TimeLogRepository;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TimeLogService {

    private final TimeLogRepository timeLogRepository;
    private final WorkOrderRepository workOrderRepository;
    private final TechnicianRepository technicianRepository;

    public TimeLogResponse createTimeLog(TimeLogRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(request.getWorkOrderId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Work Order not found with id: " + request.getWorkOrderId()));

        Technician technician = technicianRepository.findById(request.getTechnicianId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Technician not found with id: " + request.getTechnicianId()));

        TimeLog timeLog = TimeLog.builder()
                .workOrder(workOrder)
                .technician(technician)
                .startTime(request.getStartTime())
                .endTime(request.getEndTime())
                .hoursWorked(request.getHoursWorked())
                .remarks(request.getRemarks())
                .build();

        return mapToResponse(timeLogRepository.save(timeLog));
    }

    public List<TimeLogResponse> getAllTimeLogs() {

        return timeLogRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TimeLogResponse> getByWorkOrder(Long workOrderId) {

        return timeLogRepository.findByWorkOrderId(workOrderId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<TimeLogResponse> getByTechnician(Long technicianId) {

        return timeLogRepository.findByTechnicianId(technicianId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public void deleteTimeLog(Long id) {

        TimeLog timeLog = timeLogRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Time Log not found with id: " + id));

        timeLogRepository.delete(timeLog);
    }

    private TimeLogResponse mapToResponse(TimeLog timeLog) {

        return TimeLogResponse.builder()
                .id(timeLog.getId())
                .workOrderId(timeLog.getWorkOrder().getId())
                .workOrderTitle(timeLog.getWorkOrder().getTitle())
                .technicianId(timeLog.getTechnician().getId())
                .technicianName(timeLog.getTechnician().getTechnicianName())
                .startTime(timeLog.getStartTime())
                .endTime(timeLog.getEndTime())
                .hoursWorked(timeLog.getHoursWorked())
                .remarks(timeLog.getRemarks())
                .build();
    }
}