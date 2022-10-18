package com.br.nlog.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.br.nlog.domain.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
	@Transactional(readOnly = true)
	User findByEmail(String email);
}
