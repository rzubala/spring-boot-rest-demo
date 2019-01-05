package com.zubala.crmcustomer.repository;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.zubala.crmcustomer.entity.UserRole;
import com.zubala.crmcustomer.entity.UserRole.UserRolePK;

@Repository
public interface UserRoleRepository extends JpaRepository<UserRole, UserRolePK> {
	@Query("select ur.user.id from UserRole ur where ur.user.id = ?1 and ur.role.id = ?2")
	Long existsUserRole(Long userId, Long roleId);

	@Transactional
	@Modifying
	@Query("delete UserRole ur where ur.user.id = ?1 and ur.role.id = ?2")
	void deleteUserRole(Long userId, Long roleId);

	@Modifying
	@Query(value = "insert into user_role (user_id, role_id) VALUES (:userId, :roleId)", nativeQuery = true)
	@Transactional
	void insertUserRole(@Param("userId") Long userId, @Param("roleId") Long roleId);
}
