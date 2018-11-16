package com.zubala.crmcustomer.service;

import javax.validation.Valid;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import com.zubala.crmcustomer.entity.Customer;

public interface CustomerService {

	Page<Customer> getAllCustomers(Pageable pageable);

	Customer addNewCustomer(@Valid Customer newCustomer);

	Customer findById(Long customerId);

	Customer updateCustomer(Long customerId, @Valid Customer theCustomer);

	ResponseEntity<?> deleteCustomer(Long customerId);

}
