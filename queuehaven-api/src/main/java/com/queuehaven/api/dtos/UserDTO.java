package com.queuehaven.api.dtos;

public class UserDTO {

    private String username;

    public static UserDTO create(String username) {
        return new UserDTO().setUsername(username);
    }

    public String getUsername() {
        return username;
    }

    public UserDTO setUsername(String username) {
        this.username = username;
        return this;
    }

    @Override
    public String toString() {
        return "UserDTO{" +
                "username='" + username + '\'' +
                '}';
    }
}
