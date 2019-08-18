package com.queuehaven.api.dtos;

public class QueueEntryDTO {

    private String queueEntryId;
    private String username;
    private String gameId;
    private int position = 999;

    public static QueueEntryDTO create() {
        return new QueueEntryDTO();
    }

    public String getQueueEntryId() {
        return queueEntryId;
    }

    public QueueEntryDTO setQueueEntryId(String queueEntryId) {
        this.queueEntryId = queueEntryId;
        return this;
    }

    public String getUsername() {
        return username;
    }

    public QueueEntryDTO setUsername(String username) {
        this.username = username;
        return this;
    }

    public String getGameId() {
        return gameId;
    }

    public QueueEntryDTO setGameId(String gameId) {
        this.gameId = gameId;
        return this;
    }

    public int getPosition() {
        return position;
    }

    public QueueEntryDTO setPosition(int position) {
        this.position = position;
        return this;
    }

    @Override
    public String toString() {
        return "QueueEntryDTO{" +
                "queueEntryId='" + queueEntryId + '\'' +
                ", username='" + username + '\'' +
                ", gameId='" + gameId + '\'' +
                ", position=" + position +
                '}';
    }
}
