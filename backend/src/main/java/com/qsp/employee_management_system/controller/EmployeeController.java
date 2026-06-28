package com.qsp.employee_management_system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.qsp.employee_management_system.entity.Employee;
import com.qsp.employee_management_system.responsestructure.ResponseStructure;
import com.qsp.employee_management_system.service.EmployeeService;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:80", "http://localhost"})
@RequestMapping("search")
@RestController
public class EmployeeController {
	
	@Autowired
	private EmployeeService es;
	
	//save data in database
	@PostMapping("/employees")
	public ResponseEntity<ResponseStructure<Employee>> saveemployeecontroller(@RequestBody Employee employee) {
		Employee emp = es.saveservice(employee);
		
		ResponseStructure<Employee> rs = new ResponseStructure<>();
		rs.setStatusCode(HttpStatus.CREATED.value());
		rs.setMessage("Employee Data Has Been Saved");
		rs.setData(emp);
		
		return new ResponseEntity<ResponseStructure<Employee>>(rs,HttpStatus.CREATED);
	}
	//fetch data by name
	@GetMapping("/employees")
	public List<Employee> fetchdatabyid(@RequestParam String name){
		return es.fetchdataservice(name);
	}
	
	@GetMapping("/getdata")
	public Employee alldata(@RequestParam int empid){
		return es.alldata(empid);
	}
	
	@GetMapping("/alldata")
	public List<Employee> allrecord(){
		return es.allrecordbyservice();
	}
	
	@PutMapping("/updatedata/{empid}")
	public Employee updateRecord(@PathVariable int empid, @RequestBody Employee emp) {
		return es.updateService(empid,emp);
	}
	
	@DeleteMapping("/deletedata/{empid}")
	public String deleterecordbyid(@PathVariable int empid) {
		return es.deletebyservice(empid);
//		return "Data Removed";
	}
}
