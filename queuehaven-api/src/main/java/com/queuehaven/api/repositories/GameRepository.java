package com.queuehaven.api.repositories;

import com.queuehaven.api.entities.Game;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface GameRepository extends MongoRepository<Game, String> {

}
