package com.queuehaven.api.entities;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "games")
public class Game {

    private @Id ObjectId mongoId;
    private String gameId;
    private String name;
    private String genre;
    private Integer minNumOfPlayers;
    private Integer maxNumOfPlayers;
    private String imagePath;

    public static Game create() {
        return new Game();
    }

    public String getGameId() {
        return gameId;
    }

    public Game setGameId(String gameId) {
        this.gameId = gameId;
        return this;
    }

    public String getName() {
        return name;
    }

    public Game setName(String name) {
        this.name = name;
        return this;
    }

    public String getGenre() {
        return genre;
    }

    public Game setGenre(String genre) {
        this.genre = genre;
        return this;
    }

    public Integer getMinNumOfPlayers() {
        return minNumOfPlayers;
    }

    public Game setMinNumOfPlayers(Integer minNumOfPlayers) {
        this.minNumOfPlayers = minNumOfPlayers;
        return this;
    }

    public Integer getMaxNumOfPlayers() {
        return maxNumOfPlayers;
    }

    public Game setMaxNumOfPlayers(Integer maxNumOfPlayers) {
        this.maxNumOfPlayers = maxNumOfPlayers;
        return this;
    }

    public String getImagePath() {
        return imagePath;
    }

    public Game setImagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    @Override
    public String toString() {
        return "Game{" +
                "gameId='" + gameId + '\'' +
                ", name='" + name + '\'' +
                ", genre='" + genre + '\'' +
                ", minNumOfPlayers=" + minNumOfPlayers +
                ", maxNumOfPlayers=" + maxNumOfPlayers +
                ", imagePath='" + imagePath + '\'' +
                '}';
    }
}
