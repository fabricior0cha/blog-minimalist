package com.br.nlog.dto;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.validation.constraints.NotBlank;

import com.br.nlog.domain.Post;

public class PostNewDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private String id;
	@NotBlank(message = "Title is mandatory")
	private String title;
	@NotBlank(message = "Content is mandatory")
	private String content;
	private Date date;
	private AuthorDTO author;
	private List<String> likes = new ArrayList<>();
	private List<String> tags = new ArrayList<>();
	public PostNewDTO() {
		super();
	}
	public PostNewDTO(Post obj) {
		super();
		this.id = obj.getId();
		this.title = obj.getTitle();
		this.content = obj.getContent();
		this.date = obj.getDate();
		this.author = obj.getAuthor();
		setLikes(obj.getLikes());
		setTags(obj.getTags());
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public List<String> getTags() {
		return tags;
	}
	public void setTags(List<String> tags) {
		this.tags = tags;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
	public AuthorDTO getAuthor() {
		return author;
	}
	public void setAuthor(AuthorDTO author) {
		this.author = author;
	}
	public List<String> getLikes() {
		return likes;
	}
	public void setLikes(List<String> likes) {
		this.likes = likes;
	}
	
	
	
}
