package com.queuehaven.api.repositories;

import com.queuehaven.api.entities.QueueEntry;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;
import java.util.stream.Stream;

public interface QueueEntryRepository extends MongoRepository<QueueEntry, String> {

    QueueEntry findByQueueEntryId(String queueEntryId);
    Stream<QueueEntry> findAllByUsernameOrderByPosition(String username);
}
