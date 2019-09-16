package com.queuehaven.api.dtos;

public class UserDTO {

    private String username;
    private String guild = "Scruminators 2"; // TODO Make customizable

    public static UserDTO create(String username) {
        return new UserDTO().setUsername(username.toLowerCase());
    }

    public String getUsername() {
        return username;
    }

    public UserDTO setUsername(String username) {
        this.username = username.toLowerCase();
        return this;
    }

    public String getGuild() {
        return guild;
    }

    public UserDTO setGuild(String guild) {
        this.guild = guild;
        return this;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "username='" + username + '\'' +
                ", guild='" + guild + '\'' +
                '}';
    }
}
