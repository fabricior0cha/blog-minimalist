package com.br.nlog.services;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.br.nlog.domain.Post;
import com.br.nlog.domain.User;
import com.br.nlog.dto.PostDTO;
import com.br.nlog.dto.PostNewDTO;
import com.br.nlog.repositories.PostRepository;
import com.br.nlog.services.exception.LikedPostException;
import com.br.nlog.services.exception.ObjectNotFoundException;



@Service
public class PostService {

	@Autowired
	private PostRepository repository;
	
	@Autowired
	private UserService userService;
	
	public List<Post> findAll(){
		List<Post> list = repository.findAll();	
		Collections.sort(list, Collections.reverseOrder());
		return list;
	}
	
	public List<Post> findByTitle(String title){
		List<Post> list = repository.findByTitleContainingIgnoreCase(title);
		Collections.sort(list, Collections.reverseOrder());
		return list;
	}
	
	public Post findById(String id) {
		Optional<Post> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Document not found."));		
	}
	
	public Post insert(Post obj) {
		User user = userService.findById(obj.getAuthor().getId());
		obj.setDate(new Date(System.currentTimeMillis()));
		obj = repository.insert(obj);
		user.getPosts().add(obj);
		userService.update(user);
		return obj;
	}
	
	public Post fromDTO(PostDTO dto) {
		Post obj = new Post(dto.getId(),dto.getTitle(), dto.getContent(), dto.getDate(), dto.getAuthor());
		obj.setTags(dto.getTags());
		obj.setLikes(dto.getLikes());
		return obj ;
	}
	public Post fromDTO(PostNewDTO dto) {
		Post obj = new Post(dto.getId(),dto.getTitle(), dto.getContent(), dto.getDate(), dto.getAuthor());
		obj.setTags(dto.getTags());
		obj.setLikes(dto.getLikes());
		return obj ;
	}
	
	public void delete(String id) {
		findById(id);
		repository.deleteById(id);
	}
	
	public Post update(Post obj) {
		Post newObj = findById(obj.getId());
		updateData(newObj, obj);
		return repository.save(newObj);
	}

	private void updateData(Post newObj, Post obj) {
		newObj.setTitle(obj.getTitle());
		newObj.setContent(obj.getContent());
		newObj.setTags(obj.getTags());
		newObj.setLikes(obj.getLikes());
	}
	
	public void updateLike(String id, String token) {
		User user = userService.findByToken(token);
		Post post = findById(id);
		if(post.getLikes().contains(user.getId())) {
			throw new LikedPostException("User has already liked the post.");
		}
		post.getLikes().add(user.getId());
		update(post);
	}
}

