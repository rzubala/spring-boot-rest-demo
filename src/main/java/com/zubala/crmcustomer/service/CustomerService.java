package com.zubala.crmcustomer.service;

import java.util.List;

import javax.validation.Valid;

import com.zubala.crmcustomer.entity.Customer;

public interface CustomerService {

	List<Customer> getAllCustomers();

	Customer addNewCustomer(@Valid Customer newCustomer);

	Customer findById(Long customerId);

}
