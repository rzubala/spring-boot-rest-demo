package com.zubala.crmcustomer.rest;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zubala.crmcustomer.data.ApiResponse;
import com.zubala.crmcustomer.data.AuthorizationRequest;
import com.zubala.crmcustomer.data.AuthorizationResponse;
import com.zubala.crmcustomer.data.UserRequest;
import com.zubala.crmcustomer.data.ValidationFieldError;
import com.zubala.crmcustomer.entity.User;
import com.zubala.crmcustomer.exception.ResourceNotFoundException;
import com.zubala.crmcustomer.repository.UserRepository;
import com.zubala.crmcustomer.security.JwtTokenProvider;
import com.zubala.crmcustomer.security.UserPrincipal;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	protected static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private JwtTokenProvider tokenProvider;

	@Autowired
    AuthenticationManager authenticationManager;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@PostMapping("/login")
	private ResponseEntity<?> login(@Valid @RequestBody AuthorizationRequest request) {
		String username = request.getUsername();
		String password = request.getPassword();
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);
        AuthorizationResponse response = new AuthorizationResponse();
        response.setToken(token);
        response.setExpiredIn(tokenProvider.getExpiredIn());        
        Long userId = ((UserPrincipal) authentication.getPrincipal()).getId();
		response.setUserId(userId);
        User user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
        response.setRoles(user.getRoles()
        		.stream()
        		.map(r -> r.getName().name())
				.collect(Collectors.toList()));
        return ResponseEntity.ok(response);
	}

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
        	List<ValidationFieldError> errors = new LinkedList<ValidationFieldError>();
			ValidationFieldError vfe = new ValidationFieldError();
			errors.add(vfe);
			vfe.setField("username");
			vfe.setMessage("Username is already taken!");
        	return ResponseEntity.badRequest().body(errors);
        }
        String password = passwordEncoder.encode(request.getPassword());
        User user = new User(request.getUsername(), password);
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        userRepository.save(user);
        return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));
    }
	
	@GetMapping("/token")
	private String getToken() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		String token = tokenProvider.generateTokenByUserId(userPrincipal.getId());
		return token;
	}
	
	@GetMapping("/profile")
	private ResponseEntity<?> getUserProfile() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		User user = userRepository.findById(userPrincipal.getId()).orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));
		return ResponseEntity.ok(user);
	}
	
	@PutMapping("/profile")
	private ResponseEntity<?> updateProfile(@Valid @RequestBody UserRequest request) {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();
		if (!userPrincipal.getId().equals(request.getId())) {
        	return ResponseEntity.badRequest().body(new ApiResponse(false, "Bad user id!"));
		}
		if (!request.getPassword().equals(request.getPassword2())) {
        	return ResponseEntity.badRequest().body(new ApiResponse(false, "Password does not match!"));
		}
        String password = passwordEncoder.encode(request.getPassword());
		userRepository.setUserProfileById(password, request.getEmail(), request.getPhone(), request.getId());
        return ResponseEntity.ok(new ApiResponse(true, "User updated successfully"));
	}
}
