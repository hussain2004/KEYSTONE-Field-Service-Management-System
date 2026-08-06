package com.keystone.DeliveryService.service;

import com.keystone.DeliveryService.dto.LoginRequest;
import com.keystone.DeliveryService.dto.LoginResponse;
import com.keystone.DeliveryService.entity.User;
import com.keystone.DeliveryService.repository.UserRepository;
import com.keystone.DeliveryService.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {

        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new BadCredentialsException("Invalid email or password"));

        if (!user.getActive()) {
            throw new BadCredentialsException("User account is inactive");
        }

        if (!passwordEncoder.matches(
                request.getPassword(),
                user.getPassword())) {

            throw new BadCredentialsException("Invalid email or password");
        }

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole());

        return LoginResponse.builder()
                .token(token)
                .username(user.getName())
                .role(user.getRole().name())
                .build();
    }
}