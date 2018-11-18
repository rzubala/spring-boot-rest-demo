package com.zubala.crmcustomer.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.zubala.crmcustomer.security.CustomUserDetailsService;
import com.zubala.crmcustomer.security.JwtAuthenticationFilter;
import com.zubala.crmcustomer.security.NoAuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
        securedEnabled = true,
        jsr250Enabled = true,
        prePostEnabled = true
)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
    private CustomUserDetailsService customUserDetailsService;

    @Autowired
    private NoAuthenticationEntryPoint unauthorizedHandler;

	@Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
	
    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter() {
        return new JwtAuthenticationFilter();
    }

    @Bean(BeanIds.AUTHENTICATION_MANAGER)
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

	@Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
        authenticationManagerBuilder
                .userDetailsService(customUserDetailsService)
                .passwordEncoder(passwordEncoder());
    }

	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http
	        .cors()
	            .and()
	        .csrf()
	            .disable()
            .exceptionHandling().authenticationEntryPoint(unauthorizedHandler)
            	.and()
	        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
	            .and()
	        .authorizeRequests()
	            .antMatchers("/",
	                "/favicon.ico",
	                "/**/*.png",
	                "/**/*.gif",
	                "/**/*.svg",
	                "/**/*.jpg",
	                "/**/*.html",
	                "/**/*.css",
	                "/**/*.js")
	                .permitAll()
	            .antMatchers("/api/customers/**").hasAnyRole("USER", "ADMIN")
	            .antMatchers(HttpMethod.GET, "/api/auth/token").hasAnyRole("USER", "ADMIN")
	            .antMatchers("/api/auth/**").permitAll()
	            .anyRequest().authenticated()
				.and()
				.httpBasic();
		
		// Add our custom JWT security filter
        http.addFilterBefore(jwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
    }
}
