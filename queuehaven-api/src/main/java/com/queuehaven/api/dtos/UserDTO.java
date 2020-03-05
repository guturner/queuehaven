package com.queuehaven.api.dtos;

public class UserDTO {

    private String username;
    private String password;
    private String guild = "Scruminators 2"; // TODO Make customizable

    public static UserDTO create(String username, String password) {
        return new UserDTO()
                .setUsername(username.toLowerCase())
                .setPassword(password);
    }

    public String getUsername() {
        return username;
    }

    public UserDTO setUsername(String username) {
        this.username = username.toLowerCase();
        return this;
    }

    public String getPassword() {
        return password;
    }

    public UserDTO setPassword(String password) {
        this.password = password;
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
                ", password='" + password + '\'' +
                ", guild='" + guild + '\'' +
                '}';
    }
}
