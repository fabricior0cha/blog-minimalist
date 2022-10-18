package com.br.nlog.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import com.br.nlog.domain.Post;
import com.br.nlog.domain.User;

public class UserDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String name;
	private String email;
	private String password;
	private List<Post> posts = new ArrayList<>();
	public UserDTO() {
		super();
	}
	public UserDTO(User obj) {
		this.id = obj.getId();
		this.name = obj.getName();
		this.email = obj.getName();
		this.password = obj.getPassword();
		setPosts(obj.getPosts());
		
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
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
	public List<Post> getPosts() {
		return posts;
	}
	public void setPosts(List<Post> posts) {
		this.posts = posts;
	}

	
	
	
}
