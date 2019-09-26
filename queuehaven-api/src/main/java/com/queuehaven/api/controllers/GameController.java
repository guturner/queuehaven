package com.queuehaven.api.controllers;

import com.queuehaven.api.dtos.GameDTO;
import com.queuehaven.api.mappers.GameMapper;
import com.queuehaven.api.repositories.GameRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/api/v1/games")
public class GameController {

    private final GameMapper gameMapper;
    private final GameRepository gameRepository;

    public GameController(
            GameMapper gameMapper,
            GameRepository gameRepository) {
        this.gameMapper = gameMapper;
        this.gameRepository = gameRepository;
    }

    @GetMapping("{gameId}")
    @Secured("ROLE_USER")
    public ResponseEntity getGame(@PathVariable String gameId) {
        return ResponseEntity.ok(gameRepository.findByGameId(gameId));
    }

    @GetMapping
    @Secured("ROLE_USER")
    public ResponseEntity getGames() {
        return ResponseEntity.ok(gameRepository.findAll());
    }

    @PostMapping
    @Secured("ROLE_USER")
    public ResponseEntity createNewGame(@RequestBody GameDTO gameDTO) {
        return gameMapper.asGame(gameDTO.setGameId(UUID.randomUUID().toString()))
                .map(gameRepository::save)
                .map(game -> ResponseEntity.status(HttpStatus.CREATED).body(gameDTO))
                .orElse(ResponseEntity.badRequest().build());
    }
}
