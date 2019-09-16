package com.queuehaven.api.dtos;

public class EventDTO {

    private String eventId;
    private String title;
    private String createdBy;
    private String userChoosingGame;
    private String start;
    private String end;

    public static EventDTO create() {
        return new EventDTO();
    }

    public String getEventId() {
        return eventId;
    }

    public EventDTO setEventId(String eventId) {
        this.eventId = eventId;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public EventDTO setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public EventDTO setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public String getUserChoosingGame() {
        return userChoosingGame;
    }

    public EventDTO setUserChoosingGame(String userChoosingGame) {
        this.userChoosingGame = userChoosingGame;
        return this;
    }

    public String getStart() {
        return start;
    }

    public EventDTO setStart(String start) {
        this.start = start;
        return this;
    }

    public String getEnd() {
        return end;
    }

    public EventDTO setEnd(String end) {
        this.end = end;
        return this;
    }

    @Override
    public String toString() {
        return "EventDTO{" +
                "eventId='" + eventId + '\'' +
                ", title='" + title + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", userChoosingGame='" + userChoosingGame + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                '}';
    }
}
