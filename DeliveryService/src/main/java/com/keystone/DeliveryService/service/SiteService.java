package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.SiteRequest;
import com.keystone.DeliveryService.dto.SiteResponse;
import com.keystone.DeliveryService.entity.Customer;
import com.keystone.DeliveryService.entity.Site;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.CustomerRepository;
import com.keystone.DeliveryService.repository.SiteRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;
import com.keystone.DeliveryService.dto.SiteUpdateRequest;
import com.keystone.DeliveryService.repository.WorkOrderRepository;

@Service
public class SiteService {

    private final SiteRepository siteRepository;
    private final CustomerRepository customerRepository;
    private final WorkOrderRepository workOrderRepository;

    public SiteService(
            SiteRepository siteRepository,
            CustomerRepository customerRepository,
            WorkOrderRepository workOrderRepository) {

        this.siteRepository = siteRepository;
        this.customerRepository = customerRepository;
        this.workOrderRepository = workOrderRepository;
    }
    public SiteResponse createSite(SiteRequest request) {

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with id: " + request.getCustomerId()));

        Site site = new Site();

        site.setSiteName(request.getSiteName());
        site.setAddress(request.getAddress());
        site.setCity(request.getCity());
        site.setState(request.getState());
        site.setCountry(request.getCountry());
        site.setPostalCode(request.getPostalCode());

        site.setCustomer(customer);

        Site savedSite = siteRepository.save(site);

        SiteResponse response = new SiteResponse();

        response.setId(savedSite.getId());
        response.setSiteName(savedSite.getSiteName());
        response.setAddress(savedSite.getAddress());
        response.setCity(savedSite.getCity());
        response.setState(savedSite.getState());
        response.setCountry(savedSite.getCountry());
        response.setPostalCode(savedSite.getPostalCode());

        response.setCustomerId(savedSite.getCustomer().getId());
        response.setCustomerName(savedSite.getCustomer().getCustomerName());

        return response;
    }
    public List<SiteResponse> getAllSites() {

        return siteRepository.findAll()
                .stream()
                .map(site -> {

                    SiteResponse response = new SiteResponse();

                    response.setId(site.getId());
                    response.setSiteName(site.getSiteName());
                    response.setAddress(site.getAddress());
                    response.setCity(site.getCity());
                    response.setState(site.getState());
                    response.setCountry(site.getCountry());
                    response.setPostalCode(site.getPostalCode());

                    response.setCustomerId(site.getCustomer().getId());
                    response.setCustomerName(site.getCustomer().getCustomerName());

                    return response;
                })
                .collect(Collectors.toList());
    }
    public SiteResponse getSiteById(Long id) {

        Site site = siteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Site not found with id: " + id));

        SiteResponse response = new SiteResponse();

        response.setId(site.getId());
        response.setSiteName(site.getSiteName());
        response.setAddress(site.getAddress());
        response.setCity(site.getCity());
        response.setState(site.getState());
        response.setCountry(site.getCountry());
        response.setPostalCode(site.getPostalCode());

        response.setCustomerId(site.getCustomer().getId());
        response.setCustomerName(site.getCustomer().getCustomerName());

        return response;
    }
    public SiteResponse updateSite(Long id, SiteUpdateRequest request) {

        Site site = siteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Site not found with id: " + id));

        Customer customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Customer not found with id: " + request.getCustomerId()));

        site.setSiteName(request.getSiteName());
        site.setAddress(request.getAddress());
        site.setCity(request.getCity());
        site.setState(request.getState());
        site.setCountry(request.getCountry());
        site.setPostalCode(request.getPostalCode());

        // Update the relationship
        site.setCustomer(customer);

        Site updatedSite = siteRepository.save(site);

        SiteResponse response = new SiteResponse();

        response.setId(updatedSite.getId());
        response.setSiteName(updatedSite.getSiteName());
        response.setAddress(updatedSite.getAddress());
        response.setCity(updatedSite.getCity());
        response.setState(updatedSite.getState());
        response.setCountry(updatedSite.getCountry());
        response.setPostalCode(updatedSite.getPostalCode());

        response.setCustomerId(updatedSite.getCustomer().getId());
        response.setCustomerName(updatedSite.getCustomer().getCustomerName());

        return response;
    }
    public void deleteSite(Long id) {

        Site site = siteRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Site not found with id: " + id));

        if (workOrderRepository.existsBySiteId(id)) {
            throw new IllegalStateException(
                    "Cannot delete site because work orders exist. Delete the work orders first."
            );
        }

        siteRepository.delete(site);
    }


}