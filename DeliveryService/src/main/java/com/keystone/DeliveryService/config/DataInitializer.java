package com.keystone.DeliveryService.config;

import com.keystone.DeliveryService.entity.User;
import com.keystone.DeliveryService.enums.Role;
import com.keystone.DeliveryService.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        createUser(
                "Administrator",
                "admin@keystone.com",
                "admin123",
                Role.ADMIN
        );

        createUser(
                "Engineer",
                "engineer@keystone.com",
                "engineer123",
                Role.ENGINEER
        );

        createUser(
                "Customer",
                "customer@keystone.com",
                "customer123",
                Role.CUSTOMER
        );
    }

    private void createUser(
            String name,
            String email,
            String password,
            Role role) {

        if (!userRepository.existsByEmail(email)) {

            User user = User.builder()
                    .name(name)
                    .email(email)
                    .password(passwordEncoder.encode(password))
                    .role(role)
                    .active(true)
                    .build();

            userRepository.save(user);
        }
    }
}