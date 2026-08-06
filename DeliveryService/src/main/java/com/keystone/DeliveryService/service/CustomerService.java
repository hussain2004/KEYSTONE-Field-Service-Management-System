package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.CustomerRequest;
import com.keystone.DeliveryService.dto.CustomerResponse;
import com.keystone.DeliveryService.dto.CustomerUpdateRequest;
import com.keystone.DeliveryService.entity.Customer;
import com.keystone.DeliveryService.exception.ResourceAlreadyExistsException;
import com.keystone.DeliveryService.exception.ResourceNotFoundException;
import com.keystone.DeliveryService.repository.CustomerRepository;
import com.keystone.DeliveryService.repository.SiteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final SiteRepository siteRepository;

    public CustomerResponse createCustomer(CustomerRequest request) {

        if (customerRepository.existsByEmail(request.getEmail())) {
            throw new ResourceAlreadyExistsException("Customer email already exists");
        }

        Customer customer = Customer.builder()
                .customerName(request.getCustomerName())
                .companyName(request.getCompanyName())
                .email(request.getEmail())
                .phoneNumber(request.getPhoneNumber())
                .address(request.getAddress())
                .active(true)
                .build();

        Customer savedCustomer = customerRepository.save(customer);

        return CustomerResponse.builder()
                .id(savedCustomer.getId())
                .customerName(savedCustomer.getCustomerName())
                .companyName(savedCustomer.getCompanyName())
                .email(savedCustomer.getEmail())
                .phoneNumber(savedCustomer.getPhoneNumber())
                .address(savedCustomer.getAddress())
                .active(savedCustomer.getActive())
                .build();
    }

    public List<CustomerResponse> getAllCustomers() {

        List<Customer> customers = customerRepository.findAll();

        return customers.stream()
                .map(customer -> CustomerResponse.builder()
                        .id(customer.getId())
                        .customerName(customer.getCustomerName())
                        .companyName(customer.getCompanyName())
                        .email(customer.getEmail())
                        .phoneNumber(customer.getPhoneNumber())
                        .address(customer.getAddress())
                        .active(customer.getActive())
                        .build())
                .collect(Collectors.toList());
    }
    public Page<CustomerResponse> getCustomers(
            String search,
            int page,
            int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<Customer> customers;

        if (search == null || search.isBlank()) {

            customers = customerRepository.findAll(pageable);

        } else {

            customers = customerRepository
                    .findByCustomerNameContainingIgnoreCaseOrCompanyNameContainingIgnoreCase(
                            search,
                            search,
                            pageable
                    );
        }

        return customers.map(customer ->
                CustomerResponse.builder()
                        .id(customer.getId())
                        .customerName(customer.getCustomerName())
                        .companyName(customer.getCompanyName())
                        .email(customer.getEmail())
                        .phoneNumber(customer.getPhoneNumber())
                        .address(customer.getAddress())
                        .active(customer.getActive())
                        .build()
        );
    }

    public CustomerResponse getCustomerById(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: " + id));

        return CustomerResponse.builder()
                .id(customer.getId())
                .customerName(customer.getCustomerName())
                .companyName(customer.getCompanyName())
                .email(customer.getEmail())
                .phoneNumber(customer.getPhoneNumber())
                .address(customer.getAddress())
                .active(customer.getActive())
                .build();
    }

    public CustomerResponse updateCustomer(Long id, CustomerUpdateRequest request) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: " + id));

        customer.setCustomerName(request.getCustomerName());
        customer.setCompanyName(request.getCompanyName());
        customer.setEmail(request.getEmail());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setAddress(request.getAddress());
        customer.setActive(request.getActive());

        Customer updatedCustomer = customerRepository.save(customer);

        return CustomerResponse.builder()
                .id(updatedCustomer.getId())
                .customerName(updatedCustomer.getCustomerName())
                .companyName(updatedCustomer.getCompanyName())
                .email(updatedCustomer.getEmail())
                .phoneNumber(updatedCustomer.getPhoneNumber())
                .address(updatedCustomer.getAddress())
                .active(updatedCustomer.getActive())
                .build();
    }

    public void deleteCustomer(Long id) {

        Customer customer = customerRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Customer not found with id: " + id));

        if (siteRepository.existsByCustomerId(id)) {
            throw new RuntimeException(
                    "Cannot delete customer because sites exist. Delete the sites first."
            );
        }

        customerRepository.delete(customer);
    }
}