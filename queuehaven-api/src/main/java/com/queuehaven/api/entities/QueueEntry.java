package com.queuehaven.api.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "queueentries")
public class QueueEntry {

    private @Id ObjectId mongoId;
    private String queueEntryId;
    private String username;
    private String gameId;
    private int position = 999;

    public static QueueEntry create() {
        return new QueueEntry();
    }

    public String getQueueEntryId() {
        return queueEntryId;
    }

    public QueueEntry setQueueEntryId(String queueEntryId) {
        this.queueEntryId = queueEntryId;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public QueueEntry setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getGameId() {
        return gameId;
    }

    public QueueEntry setGameId(String gameId) {
        this.gameId = gameId;
        return this;
    }

    public int getPosition() {
        return position;
    }

    public QueueEntry setPosition(int position) {
        this.position = position;
        return this;
    }

    @Override
    public String toString() {
        return "QueueEntry{" +
                "queueEntryId='" + queueEntryId + '\'' +
                ", username='" + username + '\'' +
                ", gameId='" + gameId + '\'' +
                ", position=" + position +
                '}';
    }
}
