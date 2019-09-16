package com.queuehaven.api.dtos;

public class GuildDTO {

    private String name;

    public static GuildDTO create() {
        return new GuildDTO();
    }

    public String getName() {
        return name;
    }

    public GuildDTO setName(String name) {
        this.name = name;
        return this;
    }

    @Override
    public String toString() {
        return "GuildDTO{" +
                "name='" + name + '\'' +
                '}';
    }
}
