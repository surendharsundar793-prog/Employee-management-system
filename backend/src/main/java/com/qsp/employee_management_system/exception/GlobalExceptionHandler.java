package com.qsp.employee_management_system.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

//import com.qsp.employee_management_system.entity.Employee;
import com.qsp.employee_management_system.responsestructure.ResponseStructure;

@RestControllerAdvice
public class GlobalExceptionHandler {
	 
	@ExceptionHandler(SalaryValidationException.class)
	public ResponseEntity<ResponseStructure<String>> salaryexceptionhandler(SalaryValidationException sal){
		ResponseStructure<String> rs = new ResponseStructure<>();
		rs.setStatusCode(HttpStatus.BAD_REQUEST.value());
		rs.setMessage(sal.getMessage());
		rs.setData(null);
		
		return new ResponseEntity<ResponseStructure<String>>(rs,HttpStatus.BAD_REQUEST);
	}
}
