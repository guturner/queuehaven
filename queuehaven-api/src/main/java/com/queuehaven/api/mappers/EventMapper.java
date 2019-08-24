package com.queuehaven.api.mappers;

import com.queuehaven.api.dtos.EventDTO;
import com.queuehaven.api.entities.Event;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class EventMapper {

    public Optional<Event> asEvent(EventDTO eventDTO) {
        if (eventDTO == null) {
            return Optional.empty();
        } else {
            return Optional.of(
                Event.create()
                    .setEventId(eventDTO.getEventId())
                    .setTitle(eventDTO.getTitle())
                    .setUserChoosingGame(eventDTO.getUserChoosingGame())
                    .setDate(eventDTO.getDate())
                    .setCreatedBy(eventDTO.getCreatedBy())
            );
        }
    }

    public Optional<EventDTO> asEventDTO(Event event) {
        if (event == null) {
            return Optional.empty();
        } else {
            return Optional.of(
                    EventDTO.create()
                            .setEventId(event.getEventId())
                            .setTitle(event.getTitle())
                            .setUserChoosingGame(event.getUserChoosingGame())
                            .setDate(event.getDate())
                            .setCreatedBy(event.getCreatedBy())
            );
        }
    }
}
