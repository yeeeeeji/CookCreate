package com.mmt.config;

import com.mmt.common.auth.JwtUtil;
import com.mmt.common.exception.JwtAccessDeniedHandler;
import com.mmt.common.exception.JwtAuthenticationEntryPoint;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf().disable()
                .cors()
                .and()

                .formLogin().disable()

                .exceptionHandling() // 401, 403 Exception 핸들링
                .authenticationEntryPoint(jwtAuthenticationEntryPoint)
                .accessDeniedHandler(jwtAccessDeniedHandler)

                .and()
                .authorizeRequests() // 요청에 대한 권한 설정
                .antMatchers("/auth/signup").permitAll()
                .antMatchers("/api-docs/**").permitAll()
                .antMatchers("/swagger-ui/**").permitAll()
                .anyRequest().authenticated()

                .and()
                .sessionManagement() // 세션 사용하지 않음
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)

                //.and()
                //.apply(new JwtSecurityConfig(jwtUtil))

                .and().build();
    }

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return (web) -> web.ignoring()
                .antMatchers("/img");
    }
}
