package com.br.nlog.resources;

import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.br.nlog.domain.Post;
import com.br.nlog.dto.PostDTO;
import com.br.nlog.dto.PostNewDTO;
import com.br.nlog.services.PostService;

@RestController
@RequestMapping(value = "/posts")
@CrossOrigin(origins = "*")
public class PostResource {
	@Autowired
	private PostService service;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<PostDTO>> findAll(){
		List<PostDTO> list = service.findAll().stream().map(obj -> new PostDTO(obj))
				.collect(Collectors.toList());
		
		return ResponseEntity.ok().body(list);
	}
	
	@RequestMapping(path = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<PostDTO> findById(@PathVariable String id){
		PostDTO obj = new PostDTO(service.findById(id));
		return ResponseEntity.ok().body(obj);
	}
	
	@RequestMapping(path = "/filter", method = RequestMethod.GET)
	public ResponseEntity<List<PostDTO>> findByTitle(@RequestParam String title){
		List<PostDTO> list = service.findByTitle(title).stream().map(obj -> new PostDTO(obj))
				.collect(Collectors.toList());
		return ResponseEntity.ok().body(list);
	}
	
	
	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<Void> insert(@RequestBody @Valid PostNewDTO objDto){
		Post obj = service.fromDTO(objDto);
		obj = service.insert(obj);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
				.path("/{id}").buildAndExpand(obj.getId()).toUri();
		return ResponseEntity.created(uri).build();
	}
	@RequestMapping(path = "/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<Void> delete(@PathVariable String id){
		service.delete(id);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/{id}", method=RequestMethod.PUT)
 	public ResponseEntity<Void> update(@RequestBody PostDTO objDto, @PathVariable String id) {
		Post obj = service.fromDTO(objDto);
		obj.setId(id);
		obj = service.update(obj);
		return ResponseEntity.noContent().build();
	}
	
	@RequestMapping(value="/like/{id}", method=RequestMethod.POST)
	public ResponseEntity<Void> updateLike(@PathVariable String id, 
			@RequestHeader("Authorization") String token){
		service.updateLike(id, token);
		return ResponseEntity.noContent().build();
	}
}

