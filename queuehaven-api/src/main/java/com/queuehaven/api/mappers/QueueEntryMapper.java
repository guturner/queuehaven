package com.queuehaven.api.mappers;

import com.queuehaven.api.dtos.QueueEntryDTO;
import com.queuehaven.api.entities.QueueEntry;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class QueueEntryMapper {

    public Optional<QueueEntry> asQueueEntry(QueueEntryDTO queueEntryDTO) {
        if (queueEntryDTO == null) {
            return Optional.empty();
        } else {
            return Optional.of(
                    QueueEntry.create()
                            .setQueueEntryId(queueEntryDTO.getQueueEntryId())
                            .setUsername(queueEntryDTO.getUsername())
                            .setGameId(queueEntryDTO.getGameId())
                            .setPosition(queueEntryDTO.getPosition())
            );
        }
    }

    public Optional<QueueEntryDTO> asQueueEntryDTO(QueueEntry queueEntry) {
        if (queueEntry == null) {
            return Optional.empty();
        } else {
            return Optional.of(
                    QueueEntryDTO.create()
                            .setQueueEntryId(queueEntry.getQueueEntryId())
                            .setUsername(queueEntry.getUsername())
                            .setGameId(queueEntry.getGameId())
                            .setPosition(queueEntry.getPosition())
            );
        }
    }
}
