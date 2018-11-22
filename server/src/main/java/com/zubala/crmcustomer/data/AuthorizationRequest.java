package com.zubala.crmcustomer.data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

public class AuthorizationRequest {
    @NotBlank
    @Size(max = 15)
	private String username;
	
    @NotBlank
    @Size(max = 100)
	private String password;
    
    public AuthorizationRequest() {}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
