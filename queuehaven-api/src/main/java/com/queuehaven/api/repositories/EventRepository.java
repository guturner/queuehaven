package com.queuehaven.api.repositories;

import com.queuehaven.api.entities.Event;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface EventRepository extends MongoRepository<Event, String> {

    @Query("{ 'id' : ?0 }")
    Event findByEventId(String id);
}
