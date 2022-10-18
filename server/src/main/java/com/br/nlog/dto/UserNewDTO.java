package com.br.nlog.dto;

import java.io.Serializable;

import javax.validation.constraints.NotBlank;

public class UserNewDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	@NotBlank(message = "Name is mandatory")
	private String name;
	@NotBlank(message = "Email is mandatory")
	private String email;
	@NotBlank(message = "Password is mandatory")
	private String password;

	public UserNewDTO() {
		super();
	}

	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	
	
	
	
}
