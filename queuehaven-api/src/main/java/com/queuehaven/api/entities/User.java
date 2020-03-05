package com.queuehaven.api.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "users")
public class User {

    private @Id ObjectId mongoId;
    private String username;
    private String password;
    private String guild;

    public static User create(String username, String password) {
        return new User()
                .setUsername(username.toLowerCase())
                .setPassword(password);
    }

    public String getUsername() {
        return username;
    }

    public User setUsername(String username) {
        this.username = username.toLowerCase();
        return this;
    }

    public String getPassword() {
        return password;
    }

    public User setPassword(String password) {
        this.password = password;
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
                ", password='" + password + '\'' +
                ", guild='" + guild + '\'' +
                '}';
    }
}
