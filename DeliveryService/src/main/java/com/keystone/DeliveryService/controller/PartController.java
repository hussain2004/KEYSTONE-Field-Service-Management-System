package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.part.PartRequest;
import com.keystone.DeliveryService.dto.part.PartResponse;
import com.keystone.DeliveryService.service.PartService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/parts")
@RequiredArgsConstructor
public class PartController {

    private final PartService partService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public PartResponse createPart(
            @Valid @RequestBody PartRequest request) {

        return partService.createPart(request);
    }

    @GetMapping
    public List<PartResponse> getAllParts() {

        return partService.getAllParts();
    }

    @GetMapping("/{id}")
    public PartResponse getPartById(
            @PathVariable Long id) {

        return partService.getPartById(id);
    }

    @PutMapping("/{id}")
    public PartResponse updatePart(
            @PathVariable Long id,
            @Valid @RequestBody PartRequest request) {

        return partService.updatePart(id, request);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deletePart(
            @PathVariable Long id) {

        partService.deletePart(id);
    }
}