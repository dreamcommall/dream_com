package com.bitc.dream_com.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable()
                .headers().frameOptions().disable();

        http.authorizeHttpRequests()
                .antMatchers("/mypage").hasRole("ROLE_USER")
                .antMatchers("/**").permitAll()
                .anyRequest().authenticated();
        http.formLogin()
                .permitAll()
                .loginPage("/login");

        return http.build();
    }
}
