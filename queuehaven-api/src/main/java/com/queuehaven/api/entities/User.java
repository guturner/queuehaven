package com.queuehaven.api.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    private @Id ObjectId mongoId;
    private String username;
    private String guild;

    public static User create(String username) {
        return new User().setUsername(username.toLowerCase());
    }

    public String getUsername() {
        return username;
    }

    public User setUsername(String username) {
        this.username = username.toLowerCase();
        return this;
    }

    public String getGuild() {
        return guild;
    }

    public User setGuild(String guild) {
        this.guild = guild;
        return this;
    }

    @Override
    public String toString() {
        return "User{" +
                "username='" + username + '\'' +
                ", guild='" + guild + '\'' +
                '}';
    }
}
