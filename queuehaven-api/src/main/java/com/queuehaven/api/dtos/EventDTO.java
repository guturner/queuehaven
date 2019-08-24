package com.queuehaven.api.dtos;

public class EventDTO {

    private String eventId;
    private String title;
    private String createdBy;
    private String userChoosingGame;
    private String date;

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

    public String getDate() {
        return date;
    }

    public EventDTO setDate(String date) {
        this.date = date;
        return this;
    }

    @Override
    public String toString() {
        return "EventDTO{" +
                "eventId='" + eventId + '\'' +
                ", title='" + title + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", userChoosingGame='" + userChoosingGame + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}
