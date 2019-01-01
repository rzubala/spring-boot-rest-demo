package com.zubala.crmcustomer.rest;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.zubala.crmcustomer.data.ValidationFieldError;

@ControllerAdvice
public class AuthExceptionHandler {

	@ExceptionHandler
	public ResponseEntity<CustomerErrorResponse> handleException(BadCredentialsException ex) {
		CustomerErrorResponse error = new CustomerErrorResponse(HttpStatus.BAD_REQUEST.value(), ex.getMessage(), System.currentTimeMillis());
		return ResponseEntity.badRequest().body(error);
	}
	
	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<List<ValidationFieldError>> handleException(MethodArgumentNotValidException ex) {
		BindingResult br = ex.getBindingResult();
		List<ValidationFieldError> errors = br.getFieldErrors().stream()
				.map(fe -> {
					ValidationFieldError vfe = new ValidationFieldError();
					vfe.setField(fe.getField());
					vfe.setMessage(fe.getDefaultMessage());
					return vfe;
				})
				.collect(Collectors.toList());
        return ResponseEntity.badRequest().body(errors);
	}
}
