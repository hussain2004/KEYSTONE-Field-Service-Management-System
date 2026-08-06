package com.keystone.DeliveryService.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DashboardResponse {

    private long customerCount;

    private long siteCount;

    private long userCount;

    private long technicianCount;

    private long workOrderCount;

    private long partCount;

    private long partUsageCount;

    private long timeLogCount;
}