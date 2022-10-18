package com.br.nlog.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.br.nlog.domain.User;
import com.br.nlog.dto.UserDTO;
import com.br.nlog.dto.UserNewDTO;
import com.br.nlog.repositories.UserRepository;
import com.br.nlog.security.JWTUtil;
import com.br.nlog.services.exception.EmailAlreadyExistsException;
import com.br.nlog.services.exception.ObjectNotFoundException;

@Service
public class UserService {

	@Autowired
	private UserRepository repository;
	
	@Autowired
	private BCryptPasswordEncoder bc;
	
	@Autowired
	private JWTUtil jwtUtil;
	
	public List<User> findAll(){
		
		return repository.findAll();
	}
	
	public User findById(String id) {
		Optional<User> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Document not found."));		
	}
	
	public User insert(User obj) {
		User user = repository.findByEmail(obj.getEmail());
		if(user != null) {
			throw new EmailAlreadyExistsException("Email already exists");
		}
		return repository.insert(obj);
	}
	
	public User fromDTO(UserDTO dto) {
		User obj = new User(dto.getId(),dto.getName(), dto.getEmail(), dto.getPassword());
		return obj ;
	}
	
	public User fromDTO(UserNewDTO dto) {
		User obj = new User(null,dto.getName(), dto.getEmail(), bc.encode(dto.getPassword()));
		return obj;
	}
	
	public void delete(String id) {
		findById(id);
		repository.deleteById(id);
	}
	
	public User update(User obj) {
		User newObj = findById(obj.getId());
		updateData(newObj, obj);
		return repository.save(newObj);
	}

	private void updateData(User newObj, User obj) {
		newObj.setName(obj.getName());
		newObj.setEmail(obj.getEmail());
		newObj.setPassword(obj.getPassword());
		newObj.setPosts(obj.getPosts());
	}
	
	private User findByEmail(String email) {
		Optional<User> obj = Optional.of(repository.findByEmail(email));
		return obj.orElseThrow(() -> new ObjectNotFoundException("Document not found."));		
	}
	
	public User findByToken(String token) {
		String tokenAuth = token.split(" ")[1];
		String email = jwtUtil.getUserName(tokenAuth);
		return findByEmail(email);
	}
}

