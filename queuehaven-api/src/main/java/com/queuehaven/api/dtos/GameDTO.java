package com.queuehaven.api.dtos;

public class GameDTO {

    private String gameId;
    private String name;
    private String genre;
    private Integer minNumOfPlayers;
    private Integer maxNumOfPlayers;
    private String imagePath;

    public static GameDTO create() {
        return new GameDTO();
    }

    public String getGameId() {
        return gameId;
    }

    public GameDTO setGameId(String gameId) {
        this.gameId = gameId;
        return this;
    }

    public String getName() {
        return name;
    }

    public GameDTO setName(String name) {
        this.name = name;
        return this;
    }

    public String getGenre() {
        return genre;
    }

    public GameDTO setGenre(String genre) {
        this.genre = genre;
        return this;
    }

    public Integer getMinNumOfPlayers() {
        return minNumOfPlayers;
    }

    public GameDTO setMinNumOfPlayers(Integer minNumOfPlayers) {
        this.minNumOfPlayers = minNumOfPlayers;
        return this;
    }

    public Integer getMaxNumOfPlayers() {
        return maxNumOfPlayers;
    }

    public GameDTO setMaxNumOfPlayers(Integer maxNumOfPlayers) {
        this.maxNumOfPlayers = maxNumOfPlayers;
        return this;
    }

    public String getImagePath() {
        return imagePath;
    }

    public GameDTO setImagePath(String imagePath) {
        this.imagePath = imagePath;
        return this;
    }

    @Override
    public String toString() {
        return "GameDTO{" +
                "gameId='" + gameId + '\'' +
                ", name='" + name + '\'' +
                ", genre='" + genre + '\'' +
                ", minNumOfPlayers=" + minNumOfPlayers +
                ", maxNumOfPlayers=" + maxNumOfPlayers +
                ", imagePath='" + imagePath + '\'' +
                '}';
    }
}
