package com.zubala.crmcustomer.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zubala.crmcustomer.security.JwtTokenProvider;
import com.zubala.crmcustomer.security.UserPrincipal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private JwtTokenProvider tokenProvider;
	
	@GetMapping("/token")
	private String getToken() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		String token = tokenProvider.generateTokenByUserId(userPrincipal.getId());
		logger.info("token: " + token);
		return token;
	}
}
