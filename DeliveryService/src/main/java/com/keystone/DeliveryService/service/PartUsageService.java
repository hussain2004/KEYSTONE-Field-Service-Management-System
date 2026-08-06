package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.partusage.PartUsageRequest;
import com.keystone.DeliveryService.dto.partusage.PartUsageResponse;
import com.keystone.DeliveryService.entity.Part;
import com.keystone.DeliveryService.entity.PartUsage;
import com.keystone.DeliveryService.entity.WorkOrder;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.PartRepository;
import com.keystone.DeliveryService.repository.PartUsageRepository;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartUsageService {

    private final PartUsageRepository partUsageRepository;
    private final PartRepository partRepository;
    private final WorkOrderRepository workOrderRepository;

    @Transactional
    public PartUsageResponse createPartUsage(
            PartUsageRequest request) {

        WorkOrder workOrder = workOrderRepository.findById(request.getWorkOrderId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Work Order not found with id: " +
                                        request.getWorkOrderId()));

        Part part = partRepository.findById(request.getPartId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Part not found with id: " +
                                        request.getPartId()));

        if (part.getStockQuantity() < request.getQuantityUsed()) {
            throw new IllegalArgumentException(
                    "Insufficient stock available.");
        }

        part.setStockQuantity(
                part.getStockQuantity() -
                        request.getQuantityUsed());

        partRepository.save(part);

        PartUsage partUsage = PartUsage.builder()
                .workOrder(workOrder)
                .part(part)
                .quantityUsed(request.getQuantityUsed())
                .build();

        return mapToResponse(
                partUsageRepository.save(partUsage));
    }

    public List<PartUsageResponse> getAllPartUsage() {

        return partUsageRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public List<PartUsageResponse> getByWorkOrder(
            Long workOrderId) {

        return partUsageRepository
                .findByWorkOrderId(workOrderId)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Transactional
    public void deletePartUsage(Long id) {

        PartUsage partUsage =
                partUsageRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Part Usage not found with id: " + id));

        Part part = partUsage.getPart();

        part.setStockQuantity(
                part.getStockQuantity() +
                        partUsage.getQuantityUsed());

        partRepository.save(part);

        partUsageRepository.delete(partUsage);
    }

    private PartUsageResponse mapToResponse(
            PartUsage partUsage) {

        return PartUsageResponse.builder()
                .id(partUsage.getId())
                .workOrderId(partUsage.getWorkOrder().getId())
                .workOrderTitle(partUsage.getWorkOrder().getTitle())
                .partId(partUsage.getPart().getId())
                .partName(partUsage.getPart().getPartName())
                .quantityUsed(partUsage.getQuantityUsed())
                .build();
    }
}