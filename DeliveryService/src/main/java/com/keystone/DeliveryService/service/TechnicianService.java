package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.technician.TechnicianRequest;
import com.keystone.DeliveryService.dto.technician.TechnicianResponse;
import com.keystone.DeliveryService.dto.technician.TechnicianUpdateRequest;
import com.keystone.DeliveryService.entity.Technician;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.TechnicianRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TechnicianService {

    private final TechnicianRepository technicianRepository;
    public TechnicianResponse createTechnician(TechnicianRequest request) {

        Technician technician = Technician.builder()
                .technicianName(request.getTechnicianName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .specialization(request.getSpecialization())
                .active(request.getActive())
                .build();

        Technician savedTechnician = technicianRepository.save(technician);

        return mapToResponse(savedTechnician);
    }
    private TechnicianResponse mapToResponse(Technician technician) {

        TechnicianResponse response = new TechnicianResponse();

        response.setId(technician.getId());
        response.setTechnicianName(technician.getTechnicianName());
        response.setEmail(technician.getEmail());
        response.setPhoneNumber(technician.getPhoneNumber());
        response.setSpecialization(technician.getSpecialization());
        response.setActive(technician.getActive());

        return response;
    }
    public List<TechnicianResponse> getAllTechnicians() {

        List<Technician> technicians = technicianRepository.findAll();

        return technicians.stream()
                .map(this::mapToResponse)
                .toList();
    }
    public TechnicianResponse getTechnicianById(Long id) {

        Technician technician = technicianRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found with id: " + id));

        return mapToResponse(technician);
    }
    public TechnicianResponse updateTechnician(Long id, TechnicianUpdateRequest request) {

        Technician technician = technicianRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found with id: " + id));

        technician.setTechnicianName(request.getTechnicianName());
        technician.setEmail(request.getEmail());
        technician.setPhoneNumber(request.getPhoneNumber());
        technician.setSpecialization(request.getSpecialization());
        technician.setActive(request.getActive());

        Technician updatedTechnician = technicianRepository.save(technician);

        return mapToResponse(updatedTechnician);
    }
    public void deleteTechnician(Long id) {

        Technician technician = technicianRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Technician not found with id: " + id));

        technicianRepository.delete(technician);
    }

}