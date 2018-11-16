package com.zubala.crmcustomer.service;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
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
}
