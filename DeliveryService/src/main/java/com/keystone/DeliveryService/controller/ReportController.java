package com.keystone.DeliveryService.controller;

import com.keystone.DeliveryService.dto.report.DashboardReportResponse;
import com.keystone.DeliveryService.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reports")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @GetMapping("/dashboard")
    public DashboardReportResponse getDashboardReport() {

        return reportService.getDashboardReport();
    }
}