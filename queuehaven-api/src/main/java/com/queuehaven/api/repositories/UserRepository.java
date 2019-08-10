package com.queuehaven.api.repositories;

import com.queuehaven.api.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, String> {

}
