package com.queuehaven.api.controllers;

import com.queuehaven.api.dtos.EventDTO;
import com.queuehaven.api.entities.Event;
import com.queuehaven.api.mappers.EventMapper;
import com.queuehaven.api.repositories.EventRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/events")
public class EventController {

    private final EventMapper eventMapper;
    private final EventRepository eventRepository;

    public EventController(
            EventMapper eventMapper,
            EventRepository eventRepository) {
        this.eventMapper = eventMapper;
        this.eventRepository = eventRepository;
    }

    @GetMapping
    @Secured("ROLE_USER")
    public ResponseEntity getEvents() {
        return ResponseEntity.ok(eventRepository.findAll());
    }

    @PostMapping
    @Secured("ROLE_USER")
    public ResponseEntity createNewEvent(@RequestBody EventDTO eventDTO) {
        return eventMapper.asEvent(eventDTO.setId(UUID.randomUUID().toString()))
                .map(eventRepository::save)
                .map(event -> ResponseEntity.status(HttpStatus.CREATED).body(eventDTO))
                .orElse(ResponseEntity.badRequest().build());
    }

    @DeleteMapping("{eventId}")
    @Secured("ROLE_USER")
    public ResponseEntity deleteEvent(@PathVariable String eventId) {
        Event event = eventRepository.findByEventId(eventId);
        if (event != null) {
            eventRepository.delete(event);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.badRequest().build();
        }
    }
}
