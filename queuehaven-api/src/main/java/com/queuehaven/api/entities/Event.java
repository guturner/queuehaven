package com.queuehaven.api.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "events")
public class Event {

    private @Id ObjectId mongoId;
    private String eventId;
    private String title;
    private String createdBy;
    private String userChoosingGame;
    private String date;

    public static Event create() {
        return new Event();
    }

    public String getEventId() {
        return eventId;
    }

    public Event setEventId(String eventId) {
        this.eventId = eventId;
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

    public String getDate() {
        return date;
    }

    public Event setDate(String date) {
        this.date = date;
        return this;
    }

    @Override
    public String toString() {
        return "Event{" +
                "eventId='" + eventId + '\'' +
                ", title='" + title + '\'' +
                ", createdBy='" + createdBy + '\'' +
                ", userChoosingGame='" + userChoosingGame + '\'' +
                ", date='" + date + '\'' +
                '}';
    }
}
