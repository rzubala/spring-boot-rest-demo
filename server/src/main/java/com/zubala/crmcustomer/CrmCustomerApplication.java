package com.zubala.crmcustomer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CrmCustomerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CrmCustomerApplication.class, args);
	}
}
