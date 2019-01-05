package com.zubala.crmcustomer.entity;

import java.io.Serializable;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.zubala.crmcustomer.entity.UserRole.UserRolePK;

@Entity
@Table(name = "user_role")
@IdClass(UserRolePK.class)
public class UserRole {
	
	public UserRole() {}
	
	@JoinColumn(name = "user_id", referencedColumnName = "id")
	@ManyToOne(fetch = FetchType.LAZY)
	@Id
	private User user;

	@JoinColumn(name = "role_id", referencedColumnName = "id")
	@ManyToOne(fetch = FetchType.LAZY)
	@Id
	private Role role;

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
	public class UserRolePK implements Serializable {
		
		private static final long serialVersionUID = 1L;

		private User user;

		private Role role;

	    public UserRolePK() {}

		public UserRolePK(User user, Role role) {
			super();
			this.user = user;
			this.role = role;
		}

		public User getUser() {
			return user;
		}

		public void setUser(User user) {
			this.user = user;
		}

		public Role getRole() {
			return role;
		}

		public void setRole(Role role) {
			this.role = role;
		}
	}	
}
