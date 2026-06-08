package com.qsp.employee_management_system.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import com.qsp.employee_management_system.entity.Employee;
import com.qsp.employee_management_system.repository.EmployeeRepository;

@Repository
public class EmployeeDao {
	@Autowired
	private EmployeeRepository er;
	
	public Employee save(@RequestBody Employee emp) {
		return er.save(emp);
	}
	
	
	public List<Employee> getEmployeeByName(String name){
		return er.findByNameContainingIgnoreCase(name);
	}
	
	public Employee getalldata(int empid) {
	  Optional<Employee> os=er.findById(empid);
	  if(os.isPresent()) {
		  return os.get(); 
	  }
	  return null;
	}
	
	public List<Employee> allrecord(){
		return er.findAll();
	}
	
	public Employee updateEmployeeData(@PathVariable int empid,@RequestBody Employee emp) {
		Optional<Employee> os=er.findById(empid);
		if(os.isPresent()) {
			Employee e=os.get();
			e.setName(emp.getName());
			e.setEmail(emp.getEmail());
			e.setDepartment(emp.getDepartment());
			e.setAddress(emp.getAddress());
			e.setSalary(emp.getSalary());
			e.setGender(emp.getGender());
			return er.save(e);
		}
		return null;
	}
	
	public String deletedatabyid(int empid) {
		Optional<Employee> os=er.findById(empid);
		if(os.isPresent()) {
			Employee emp=os.get();
			er.delete(emp);
			return "Data Removed successfully";
		}else {
			return "Data Not Removed";
		}
	}
}
