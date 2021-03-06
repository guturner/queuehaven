package com.queuehaven.api.dtos;

public class EventDTO {

    private String id;
    private String resourceId = "0";
    private String title;
    private String createdBy;
    private String userChoosingGame;
    private String start;
    private String end;

    public static EventDTO create() {
        return new EventDTO();
    }

    public String getId() {
        return id;
    }

    public EventDTO setId(String id) {
        this.id = id;
        return this;
    }

    public String getResourceId() {
        return resourceId;
    }

    public EventDTO setResourceId(String resourceId) {
        this.resourceId = resourceId;
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
                "id='" + id + '\'' +
                ", resourceId='" + resourceId + '\'' +
                ", title='" + title + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", userChoosingGame='" + userChoosingGame + '\'' +
                ", start='" + start + '\'' +
                ", end='" + end + '\'' +
                '}';
    }
}
