package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.workorder.AssignTechnicianRequest;
import com.keystone.DeliveryService.dto.workorder.CloseWorkResponse;
import com.keystone.DeliveryService.dto.workorder.CompleteWorkResponse;
import com.keystone.DeliveryService.dto.workorder.HoldWorkResponse;
import com.keystone.DeliveryService.dto.workorder.ResumeWorkResponse;
import com.keystone.DeliveryService.dto.workorder.StartWorkResponse;
import com.keystone.DeliveryService.dto.workorder.WorkOrderRequest;
import com.keystone.DeliveryService.dto.workorder.WorkOrderResponse;
import com.keystone.DeliveryService.dto.workorder.WorkOrderUpdateRequest;
import com.keystone.DeliveryService.service.WorkOrderService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/work-orders")
@RequiredArgsConstructor
public class WorkOrderController {

    private final WorkOrderService workOrderService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public WorkOrderResponse createWorkOrder(
            @Valid @RequestBody WorkOrderRequest request) {

        return workOrderService.createWorkOrder(request);
    }

    @GetMapping
    public List<WorkOrderResponse> getAllWorkOrders() {

        return workOrderService.getAllWorkOrders();
    }

    @GetMapping("/technician/{technicianId}")
    public List<WorkOrderResponse> getWorkOrdersByTechnician(
            @PathVariable Long technicianId) {

        return workOrderService.getWorkOrdersByTechnician(technicianId);
    }

    @GetMapping("/{id}")
    public WorkOrderResponse getWorkOrderById(
            @PathVariable Long id) {

        return workOrderService.getWorkOrderById(id);
    }

    @PutMapping("/{id}")
    public WorkOrderResponse updateWorkOrder(
            @PathVariable Long id,
            @Valid @RequestBody WorkOrderUpdateRequest request) {

        return workOrderService.updateWorkOrder(id, request);
    }

    @PutMapping("/{id}/assign")
    public WorkOrderResponse assignTechnician(
            @PathVariable Long id,
            @Valid @RequestBody AssignTechnicianRequest request) {

        return workOrderService.assignTechnician(
                id,
                request.getTechnicianId()
        );
    }

    @PutMapping("/{id}/start")
    public StartWorkResponse startWork(
            @PathVariable Long id) {

        return workOrderService.startWork(id);
    }

    @PutMapping("/{id}/hold")
    public HoldWorkResponse holdWork(
            @PathVariable Long id) {

        return workOrderService.holdWork(id);
    }

    @PutMapping("/{id}/resume")
    public ResumeWorkResponse resumeWork(
            @PathVariable Long id) {

        return workOrderService.resumeWork(id);
    }

    @PutMapping("/{id}/complete")
    public CompleteWorkResponse completeWork(
            @PathVariable Long id) {

        return workOrderService.completeWork(id);
    }

    @PutMapping("/{id}/close")
    public CloseWorkResponse closeWork(
            @PathVariable Long id) {

        return workOrderService.closeWork(id);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteWorkOrder(
            @PathVariable Long id) {

        workOrderService.deleteWorkOrder(id);
    }
}