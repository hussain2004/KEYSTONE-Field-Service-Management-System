package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.part.PartRequest;
import com.keystone.DeliveryService.dto.part.PartResponse;
import com.keystone.DeliveryService.entity.Part;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.PartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PartService {

    private final PartRepository partRepository;

    public PartResponse createPart(PartRequest request) {

        if (partRepository.existsByPartCode(request.getPartCode())) {
            throw new IllegalArgumentException(
                    "Part code already exists.");
        }

        Part part = Part.builder()
                .partName(request.getPartName())
                .partCode(request.getPartCode())
                .unitPrice(request.getUnitPrice())
                .stockQuantity(request.getStockQuantity())
                .build();

        return mapToResponse(
                partRepository.save(part));
    }

    public List<PartResponse> getAllParts() {

        return partRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    public PartResponse getPartById(Long id) {

        Part part = partRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Part not found with id: " + id));

        return mapToResponse(part);
    }

    public PartResponse updatePart(
            Long id,
            PartRequest request) {

        Part part = partRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Part not found with id: " + id));

        if (!part.getPartCode().equals(request.getPartCode())
                && partRepository.existsByPartCode(request.getPartCode())) {

            throw new IllegalArgumentException(
                    "Part code already exists.");
        }

        part.setPartName(request.getPartName());
        part.setPartCode(request.getPartCode());
        part.setUnitPrice(request.getUnitPrice());
        part.setStockQuantity(request.getStockQuantity());

        return mapToResponse(
                partRepository.save(part));
    }

    public void deletePart(Long id) {

        Part part = partRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Part not found with id: " + id));

        partRepository.delete(part);
    }

    private PartResponse mapToResponse(Part part) {

        return PartResponse.builder()
                .id(part.getId())
                .partName(part.getPartName())
                .partCode(part.getPartCode())
                .unitPrice(part.getUnitPrice())
                .stockQuantity(part.getStockQuantity())
                .build();
    }
}