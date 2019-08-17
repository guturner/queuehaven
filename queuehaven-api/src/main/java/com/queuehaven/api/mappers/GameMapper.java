package com.queuehaven.api.mappers;

import com.queuehaven.api.dtos.GameDTO;
import com.queuehaven.api.entities.Game;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class GameMapper {

    public Optional<Game> asGame(GameDTO gameDTO) {
        if (gameDTO == null) {
            return Optional.empty();
        } else {
            return Optional.of(
                    Game.create()
                            .setGameId(gameDTO.getGameId())
                            .setName(gameDTO.getName())
                            .setGenre(gameDTO.getGenre())
                            .setMinNumOfPlayers(gameDTO.getMinNumOfPlayers())
                            .setMaxNumOfPlayers(gameDTO.getMaxNumOfPlayers())
                            .setImagePath(gameDTO.getImagePath())
            );
        }
    }

    public Optional<GameDTO> asGameDTO(Game game) {
        if (game == null) {
            return Optional.empty();
        } else {
            return Optional.of(
                    GameDTO.create()
                            .setGameId(game.getGameId())
                            .setName(game.getName())
                            .setGenre(game.getGenre())
                            .setMinNumOfPlayers(game.getMinNumOfPlayers())
                            .setMaxNumOfPlayers(game.getMaxNumOfPlayers())
                            .setImagePath(game.getImagePath())
            );
        }
    }
}
