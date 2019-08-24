package com.queuehaven.api.dtos;

public class QueueMemberDTO {

    private String username;
    private int position = 999;

    public static QueueMemberDTO create() {
        return new QueueMemberDTO();
    }

    public String getUsername() {
        return username;
    }

    public QueueMemberDTO setUsername(String username) {
        this.username = username;
        return this;
    }

    public int getPosition() {
        return position;
    }

    public QueueMemberDTO setPosition(int position) {
        this.position = position;
        return this;
    }

    @Override
    public String toString() {
        return "QueueMemberDTO{" +
                "username='" + username + '\'' +
                ", position=" + position +
                '}';
    }
}
