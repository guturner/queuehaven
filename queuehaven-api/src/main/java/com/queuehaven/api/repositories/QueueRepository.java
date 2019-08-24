package com.queuehaven.api.repositories;

import com.queuehaven.api.entities.Queue;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QueueRepository extends MongoRepository<Queue, String> {

}
