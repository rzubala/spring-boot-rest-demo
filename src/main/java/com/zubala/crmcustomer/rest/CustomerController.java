package com.zubala.crmcustomer.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
	List<Customer> getAllCustomers() {
		return customerService.getAllCustomers();
	}

	@PostMapping("/customers")
	Customer addNewCustomer(@Valid @RequestBody Customer newCustomer) {
		return customerService.addNewCustomer(newCustomer);
	}
	
	@GetMapping("/customers/{id}")
	public Customer getCustomerById(@PathVariable(value = "id") Long customerId) {
	    return customerService.findById(customerId);
	}	
}
