package com.zubala.crmcustomer.data;

public class AuthorizationResponse {
	private String token;
	
	private long expiredIn;
	
	private Long userId;

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public long getExpiredIn() {
		return expiredIn;
	}

	public void setExpiredIn(long expiredIn) {
		this.expiredIn = expiredIn;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}
}
