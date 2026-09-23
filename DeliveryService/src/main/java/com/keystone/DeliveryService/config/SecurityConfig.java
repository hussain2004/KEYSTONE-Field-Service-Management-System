package com.keystone.DeliveryService.config;

import com.keystone.DeliveryService.security.CustomUserDetailsService;
import com.keystone.DeliveryService.security.JwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableMethodSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final CustomUserDetailsService userDetailsService;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http)
            throws Exception {

        http
                .csrf(csrf -> csrf.disable())

                .cors(Customizer.withDefaults())

                .sessionManagement(session ->
                        session.sessionCreationPolicy(
                                SessionCreationPolicy.STATELESS
                        )
                )

                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/api/auth/**")
                        .permitAll()

                        // CUSTOMER PORTAL
                        .requestMatchers("/api/customer-portal/**")
                        .hasRole("CUSTOMER")

                        // WORK ORDER - TECHNICIAN OPERATIONS
                        .requestMatchers(
                                "/api/work-orders/*/start",
                                "/api/work-orders/*/hold",
                                "/api/work-orders/*/resume",
                                "/api/work-orders/*/complete"
                        )
                        .hasAnyRole("MANAGER", "TECHNICIAN")

                        // WORK ORDER - MANAGER / DISPATCHER OPERATIONS
                        .requestMatchers(
                                "/api/work-orders/*/assign",
                                "/api/work-orders/*/close"
                        )
                        .hasAnyRole("MANAGER", "DISPATCHER")

                        // WORK ORDER - READ
                        .requestMatchers("/api/work-orders/technician/**")
                        .hasAnyRole(
                                "MANAGER",
                                "DISPATCHER",
                                "TECHNICIAN"
                        )

                        .requestMatchers(
                                "/api/work-orders",
                                "/api/work-orders/"
                        )
                        .hasAnyRole("MANAGER", "DISPATCHER")

                        // WORK ORDER - CREATE / UPDATE / DELETE
                        .requestMatchers(
                                "/api/work-orders",
                                "/api/work-orders/*"
                        )
                        .hasAnyRole("MANAGER", "DISPATCHER", "TECHNICIAN")

                        // MANAGER + DISPATCHER
                        .requestMatchers("/api/customers/**")
                        .hasAnyRole("MANAGER", "DISPATCHER")

                        .requestMatchers("/api/sites/**")
                        .hasAnyRole("MANAGER", "DISPATCHER")

                        .requestMatchers("/api/dispatch/**")
                        .hasAnyRole("MANAGER", "DISPATCHER")

                        // MANAGER ONLY
                        .requestMatchers("/api/users/**")
                        .hasRole("MANAGER")

                        .requestMatchers("/api/technicians/**")
                        .hasRole("MANAGER")

                        .requestMatchers("/api/reports/**")
                        .hasRole("MANAGER")

                        // PARTS
                        .requestMatchers("/api/parts/**")
                        .hasAnyRole(
                                "MANAGER",
                                "DISPATCHER",
                                "TECHNICIAN"
                        )

                        .requestMatchers("/api/part-usage/**")
                        .hasAnyRole(
                                "MANAGER",
                                "TECHNICIAN"
                        )

                        .requestMatchers("/api/time-logs/**")
                        .hasAnyRole(
                                "MANAGER",
                                "TECHNICIAN"
                        )

                        // DASHBOARD
                        .requestMatchers("/api/dashboard/**")
                        .hasAnyRole(
                                "MANAGER",
                                "DISPATCHER"
                        )

                        .requestMatchers("/api/**")
                        .authenticated()

                        .anyRequest()
                        .permitAll()
                )

                .userDetailsService(userDetailsService)

                .addFilterBefore(
                        jwtAuthenticationFilter,
                        UsernamePasswordAuthenticationFilter.class
                );

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }
}