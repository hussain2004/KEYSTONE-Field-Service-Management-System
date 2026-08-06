package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.ActivityResponse;
import com.keystone.DeliveryService.dto.DashboardResponse;
import com.keystone.DeliveryService.dto.RecentWorkOrderResponse;
import com.keystone.DeliveryService.repository.CustomerRepository;
import com.keystone.DeliveryService.repository.SiteRepository;
import com.keystone.DeliveryService.repository.TechnicianRepository;
import com.keystone.DeliveryService.repository.WorkOrderRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import com.keystone.DeliveryService.repository.UserRepository;
import com.keystone.DeliveryService.repository.PartRepository;
import com.keystone.DeliveryService.repository.PartUsageRepository;
import com.keystone.DeliveryService.repository.TimeLogRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;
    private final TechnicianRepository technicianRepository;
    private final WorkOrderRepository workOrderRepository;
    private final UserRepository userRepository;
    private final PartRepository partRepository;
    private final PartUsageRepository partUsageRepository;
    private final TimeLogRepository timeLogRepository;

    public DashboardResponse getDashboardStats() {

        return new DashboardResponse(

                customerRepository.count(),

                siteRepository.count(),

                userRepository.count(),

                technicianRepository.count(),

                workOrderRepository.count(),

                partRepository.count(),

                partUsageRepository.count(),

                timeLogRepository.count()
        );
    }

    public List<RecentWorkOrderResponse> getRecentWorkOrders() {

        return workOrderRepository.findTop5ByOrderByIdDesc()
                .stream()
                .map(workOrder -> {

                    RecentWorkOrderResponse response =
                            new RecentWorkOrderResponse();

                    response.setId(workOrder.getId());
                    response.setWorkOrderCode(workOrder.getWorkOrderCode());
                    response.setTitle(workOrder.getTitle());
                    response.setPriority(workOrder.getPriority());
                    response.setStatus(workOrder.getStatus());

                    response.setSiteName(
                            workOrder.getSite().getSiteName()
                    );

                    if (workOrder.getTechnician() != null) {
                        response.setTechnicianName(
                                workOrder.getTechnician().getTechnicianName()
                        );
                    }

                    return response;

                })
                .collect(Collectors.toList());
    }

    public List<ActivityResponse> getTodaysActivity() {

        return workOrderRepository.findTop5ByOrderByIdDesc()
                .stream()
                .map(workOrder -> {

                    ActivityResponse response = new ActivityResponse();

                    response.setWorkOrderCode(
                            workOrder.getWorkOrderCode()
                    );

                    response.setTitle(
                            workOrder.getTitle()
                    );

                    response.setStatus(
                            workOrder.getStatus()
                    );

                    return response;

                })
                .collect(Collectors.toList());
    }
}