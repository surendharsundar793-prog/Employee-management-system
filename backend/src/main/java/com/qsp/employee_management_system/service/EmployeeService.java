package com.qsp.employee_management_system.service;

import java.util.List;

//import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.qsp.employee_management_system.dao.EmployeeDao;
import com.qsp.employee_management_system.entity.Employee;
import com.qsp.employee_management_system.exception.SalaryValidationException;
//import com.qsp.employee_management_system.repository.EmployeeRepository;

@Service
public class EmployeeService {
	
	@Autowired
	private EmployeeDao dao;
	
	public Employee saveservice(Employee emp) {
		if(emp.getSalary() < 0) {
		    throw new SalaryValidationException("salary cannot be negative");
		}
		return dao.save(emp);
	}
	
	
	public List<Employee> fetchdataservice(String name){
		return dao.getEmployeeByName(name);
	}
	
	public Employee alldata(int empid){
		return dao.getalldata(empid);
	}
	
	public List<Employee> allrecordbyservice(){
		return dao.allrecord();
	}
	
	public Employee updateService(int empid, Employee emp) {
		return dao.updateEmployeeData(empid, emp);
	}
	
	public String deletebyservice(int empid) {
		return dao.deletedatabyid(empid); 
	}
	
}
