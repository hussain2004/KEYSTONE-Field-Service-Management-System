package com.keystone.DeliveryService.dto.customerportal;

import com.keystone.DeliveryService.enums.Priority;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CustomerPortalRequest {

    @NotBlank
    private String title;

    @NotBlank
    private String description;

    @NotNull
    private Priority priority;

    @NotNull
    @FutureOrPresent
    private LocalDate scheduledDate;

    @NotNull
    private Long siteId;
}