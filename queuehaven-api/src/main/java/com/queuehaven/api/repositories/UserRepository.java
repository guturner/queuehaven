package com.queuehaven.api.repositories;

import com.queuehaven.api.entities.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {

    Optional<User> findByUsername(String username);
    List<User> findByGuild(String guild);
}
