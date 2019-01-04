package com.zubala.crmcustomer.rest;

import java.util.Collections;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zubala.crmcustomer.entity.Role;
import com.zubala.crmcustomer.entity.RoleName;
import com.zubala.crmcustomer.entity.User;
import com.zubala.crmcustomer.exception.ApiException;
import com.zubala.crmcustomer.repository.RoleRepository;
import com.zubala.crmcustomer.repository.UserRepository;
import com.zubala.crmcustomer.repository.UserRoleRepository;

@RestController
@RequestMapping("/api/admin")
public class AdminController {
	
	protected static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@GetMapping("/users")
	public List<User> getUsers() {
		return userRepository.findAll();
	}

	@GetMapping("/roles")
	public List<Role> getRoles() {
		return roleRepository.findAll();
	}
	
	@PutMapping("/users/{uid}/roles/{rname}")
	public ResponseEntity<?> addUserRole(@PathVariable(value = "uid") Long userId, @PathVariable(value = "rname") String rname) {
		RoleName role = getRoleName(rname);
        Role userRole = roleRepository.findByName(role).orElseThrow(() -> new ApiException("User Role " + rname + " not found!"));
        User user = userRepository.findById(userId).orElseThrow(() -> new ApiException("User: " + userId +" not found!"));
        if (userRoleRepository.existsUserRole(user.getId(), userRole.getId()) != null) {
        	return ResponseEntity.ok(user);        	
        }
        user.setRoles(Collections.singleton(userRole));
		userRepository.save(user);
		return ResponseEntity.ok(user);
	}
	
	@DeleteMapping("/users/{uid}/roles/{rname}")
	public ResponseEntity<?> deleteUserRole(@PathVariable(value = "uid") Long userId, @PathVariable(value = "rname") String rname) {
		RoleName role = getRoleName(rname);
        Role userRole = roleRepository.findByName(role).orElseThrow(() -> new ApiException("User Role " + rname + " not found!"));
        User user = userRepository.findById(userId).orElseThrow(() -> new ApiException("User: " + userId +" not found!"));
        userRoleRepository.deleteUserRole(user.getId(), userRole.getId());
        return ResponseEntity.ok(user);        	
	}

	private RoleName getRoleName(String rname) {
		return RoleName.valueOf(rname);
	}
}
