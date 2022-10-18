package com.br.nlog.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.br.nlog.dto.AuthorDTO;
@Document(collection = "post")
public class Post implements Serializable, Comparable<Post> {

	private static final long serialVersionUID = 1L;
	
	@Id
	private String id;
	private String title;
	private String content;
	private Date date;
	private AuthorDTO author;
	private List<String> likes = new ArrayList<>();
	private List<String> tags = new ArrayList<>();
	public Post() {
		super();
	}

	public Post(String id, String title, String content, Date date, AuthorDTO user) {
		super();
		this.id = id;
		this.title = title;
		this.content = content;
		this.date = date;
		this.author = user;
	}
	
	 @Override
	    public int compareTo(Post p) {
	        return this.getDate().compareTo(p.getDate());
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

	

	public List<String> getLikes() {
		return likes;
	}

	public void setLikes(List<String> likes) {
		this.likes = likes;
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

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((id == null) ? 0 : id.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Post other = (Post) obj;
		if (id == null) {
			if (other.id != null)
				return false;
		} else if (!id.equals(other.id))
			return false;
		return true;
	}

	
}
