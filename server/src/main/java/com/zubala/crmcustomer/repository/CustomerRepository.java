package com.zubala.crmcustomer.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.zubala.crmcustomer.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {

    Optional<Customer> findByEmail(String email);

    Optional<Customer> findBylastNameOrEmail(String lastName, String email);

    List<Customer> findByIdIn(List<Long> customerIds);

    Optional<Customer> findByLastName(String lastName);

    Boolean existsByLastName(String lastName);

    Boolean existsByEmail(String email);

    @Query("SELECT c FROM Customer c where c.firstName = :first and c.lastName = :last")
    Customer findByFirstNameAndSecondName(@Param("first") Long userId, @Param("last") Long pollId);
}
	