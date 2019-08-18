package com.queuehaven.api.controllers;

import com.queuehaven.api.dtos.QueueEntryDTO;
import com.queuehaven.api.entities.QueueEntry;
import com.queuehaven.api.mappers.QueueEntryMapper;
import com.queuehaven.api.repositories.QueueEntryRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/queues")
public class QueueController {

    private final QueueEntryMapper queueEntryMapper;
    private final QueueEntryRepository queueEntryRepository;

    public QueueController(
            QueueEntryMapper queueEntryMapper,
            QueueEntryRepository queueEntryRepository) {
        this.queueEntryMapper = queueEntryMapper;
        this.queueEntryRepository = queueEntryRepository;
    }

    @GetMapping("username/{username}")
    @Secured("ROLE_USER")
    public ResponseEntity getQueueEntriesByUsername(@PathVariable String username) {
        return ResponseEntity.ok(queueEntryRepository.findAllByUsernameOrderByPosition(username));
    }

    @PostMapping
    @Secured("ROLE_USER")
    public ResponseEntity createNewQueueEntry(@RequestBody QueueEntryDTO queueEntryDTO) {
        return queueEntryMapper.asQueueEntry(queueEntryDTO.setQueueEntryId(UUID.randomUUID().toString()))
                .map(queueEntryRepository::save)
                .map(queueEntry -> ResponseEntity.status(201).build())
                .orElse(ResponseEntity.badRequest().build());
    }

    @DeleteMapping("{queueEntryId}")
    @Secured("ROLE_USER")
    public ResponseEntity deleteQueueEntry(@PathVariable String queueEntryId) {
        QueueEntry queueEntry = queueEntryRepository.findByQueueEntryId(queueEntryId);
        if (queueEntry != null) {
            queueEntryRepository.delete(queueEntry);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
