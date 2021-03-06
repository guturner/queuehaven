package com.queuehaven.api.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class Event {

    private @Id ObjectId mongoId;
    private String id;
    private String resourceId;
    private String title;
    private String createdBy;
    private String userChoosingGame;
    private String start;
    private String end;

    public static Event create() {
        return new Event();
    }

    public String getId() {
        return id;
    }

    public Event setId(String id) {
        this.id = id;
        return this;
    }

    public String getResourceId() {
        return resourceId;
    }

    public Event setResourceId(String resourceId) {
        this.resourceId = resourceId;
        return this;
    }

    public String getTitle() {
        return title;
    }

    public Event setTitle(String title) {
        this.title = title;
        return this;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public Event setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
        return this;
    }

    public String getUserChoosingGame() {
        return userChoosingGame;
    }

    public Event setUserChoosingGame(String userChoosingGame) {
        this.userChoosingGame = userChoosingGame;
        return this;
    }

    public String getStart() {
        return start;
    }

    public Event setStart(String start) {
        this.start = start;
        return this;
    }

    public String getEnd() {
        return end;
    }

    public Event setEnd(String end) {
        this.end = end;
        return this;
    }

    @Override
    public String toString() {
        return "Event{" +
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
