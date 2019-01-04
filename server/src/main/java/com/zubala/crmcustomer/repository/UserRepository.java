package com.zubala.crmcustomer.repository;

import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.zubala.crmcustomer.entity.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUsername(String username);

	Optional<User> findById(Long id);

	Boolean existsByUsername(String username);
	
	@Transactional
	@Modifying
	@Query("update User u set u.password = ?1, u.email = ?2, u.phone = ?3 where u.id = ?4")
	void setUserProfileById(String password, String email, String phone, Long userId);
	
	@Query("select ur.user.id from UserRole ur where ur.user.id = ?1 and ur.role.id = ?2")
	Long existsUserRole(Long userId, Long roleId);

	@Transactional
	@Modifying
	@Query("delete UserRole ur where ur.user.id = ?1 and ur.role.id = ?2")
	void deleteUserRole(Long userId, Long roleId);
}
