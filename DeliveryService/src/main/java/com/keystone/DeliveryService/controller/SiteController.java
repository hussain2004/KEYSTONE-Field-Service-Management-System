package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.SiteRequest;
import com.keystone.DeliveryService.dto.SiteResponse;
import com.keystone.DeliveryService.service.SiteService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.keystone.DeliveryService.dto.SiteUpdateRequest;

@RestController
@RequestMapping("/api/sites")
public class SiteController {

    private final SiteService siteService;

    public SiteController(SiteService siteService) {
        this.siteService = siteService;
    }

    @PostMapping
    public ResponseEntity<SiteResponse> createSite(
            @Valid @RequestBody SiteRequest request) {

        return ResponseEntity.ok(siteService.createSite(request));
    }
    @GetMapping
    public ResponseEntity<List<SiteResponse>> getAllSites() {

        return ResponseEntity.ok(siteService.getAllSites());
    }
    @GetMapping("/{id}")
    public ResponseEntity<SiteResponse> getSiteById(@PathVariable Long id) {

        return ResponseEntity.ok(siteService.getSiteById(id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<SiteResponse> updateSite(
            @PathVariable Long id,
            @Valid @RequestBody SiteUpdateRequest request) {

        return ResponseEntity.ok(siteService.updateSite(id, request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSite(@PathVariable Long id) {

        siteService.deleteSite(id);

        return ResponseEntity.ok("Site deleted successfully");
    }
}