package com.zubala.crmcustomer.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.zubala.crmcustomer.entity.Customer;
import com.zubala.crmcustomer.service.CustomerService;

@RestController
@RequestMapping("/api")
public class CustomerController {

	@Autowired
	private CustomerService customerService;
	
	@GetMapping("/customers")
	//@Secured({"ROLE_USER", "ROLE_ADMIN"})
	//@PreAuthorize("hasAnyRole('ROLE_USER', 'ROLE_ADMIN')")
	//@RolesAllowed({"ROLE_USER", "ROLE_ADMIN"})
	Page<Customer> getAllCustomers(Pageable pageable) {
		return customerService.getAllCustomers(pageable);
	}

	@PostMapping("/customers")
	Customer addNewCustomer(@Valid @RequestBody Customer newCustomer) {
		return customerService.addNewCustomer(newCustomer);
	}
	
	@GetMapping("/customers/{id}")
	public Customer getCustomerById(@PathVariable(value = "id") Long customerId) {
	    return customerService.findById(customerId);
	}	

	@DeleteMapping("/customers/{id}")
	public ResponseEntity<?> deleteCustomerById(@PathVariable(value = "id") Long customerId) {
	    return customerService.deleteCustomer(customerId);
	}	

	@PutMapping("/customers/{id}")
	public Customer updateCustome(@PathVariable(value = "id") Long customerId, @Valid @RequestBody Customer theCustomer) {
	    return customerService.updateCustomer(customerId, theCustomer);
	}	
}
