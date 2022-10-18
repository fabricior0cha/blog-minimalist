package com.br.nlog.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.br.nlog.domain.Post;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {

}
