package com.zubala.crmcustomer.data;

public class ApiResponse {
    
	public ApiResponse() {}
	
	public ApiResponse(Boolean success, String message) {
		this.success = success;
		this.message = message;
	}

	private Boolean success;

    private String message;

	public Boolean getSuccess() {
		return success;
	}

	public void setSuccess(Boolean success) {
		this.success = success;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

}
