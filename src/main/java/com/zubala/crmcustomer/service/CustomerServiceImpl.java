package com.zubala.crmcustomer.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.zubala.crmcustomer.entity.Customer;
import com.zubala.crmcustomer.exception.ResourceNotFoundException;
import com.zubala.crmcustomer.repository.CustomerRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	@Override
	public List<Customer> getAllCustomers() {
		return customerRepository.findAll();
	}

	@Override
	public Customer addNewCustomer(@Valid Customer newCustomer) {
		return customerRepository.save(newCustomer);
	}

	@Override
	public Customer findById(Long customerId) {
	    return customerRepository.findById(customerId).orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));
	}

	@Override
	public Customer updateCustomer(Long customerId, @Valid Customer theCustomer) {
		return customerRepository.findById(customerId)
				.map(customer -> {
					customer.setFirstName(theCustomer.getFirstName());
					customer.setLastName(theCustomer.getLastName());
					customer.setEmail(theCustomer.getEmail());
				    return customerRepository.save(customer);
				})
				.orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));
	}

	@Override
	public ResponseEntity<?> deleteCustomer(Long customerId) {
		return customerRepository.findById(customerId)
				.map(customer -> {
					customerRepository.delete(customer);
					return ResponseEntity.ok().build();
				})
				.orElseThrow(() -> new ResourceNotFoundException("Customer", "id", customerId));

	}
}
