package com.zubala.crmcustomer.data;

public class ApiResponse {

	private Boolean success;

    private String message;
    
    private String field;
    
	public ApiResponse() {}
	
	public ApiResponse(Boolean success, String message, String field) {
		this.success = success;
		this.message = message;
		this.field = field;
	}

	public ApiResponse(Boolean success, String message) {
		this(success, message, null);
	}

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

	public String getField() {
		return field;
	}

	public void setField(String field) {
		this.field = field;
	}

}
