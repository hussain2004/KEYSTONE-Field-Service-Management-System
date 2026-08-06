package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.technician.TechnicianRequest;
import com.keystone.DeliveryService.dto.technician.TechnicianResponse;
import com.keystone.DeliveryService.dto.technician.TechnicianUpdateRequest;
import com.keystone.DeliveryService.service.TechnicianService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/technicians")
@RequiredArgsConstructor
public class TechnicianController {

    private final TechnicianService technicianService;
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TechnicianResponse createTechnician(
            @Valid @RequestBody TechnicianRequest request) {

        return technicianService.createTechnician(request);
    }
    @GetMapping
    public List<TechnicianResponse> getAllTechnicians() {

        return technicianService.getAllTechnicians();
    }
    @GetMapping("/{id}")
    public TechnicianResponse getTechnicianById(@PathVariable Long id) {

        return technicianService.getTechnicianById(id);
    }
    @PutMapping("/{id}")
    public TechnicianResponse updateTechnician(
            @PathVariable Long id,
            @Valid @RequestBody TechnicianUpdateRequest request) {

        return technicianService.updateTechnician(id, request);
    }
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTechnician(@PathVariable Long id) {

        technicianService.deleteTechnician(id);
    }

}
