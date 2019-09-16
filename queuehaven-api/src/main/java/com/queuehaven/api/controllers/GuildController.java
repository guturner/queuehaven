package com.queuehaven.api.controllers;

import com.queuehaven.api.dtos.GuildDTO;
import com.queuehaven.api.entities.User;
import com.queuehaven.api.mappers.UserMapper;
import com.queuehaven.api.repositories.EventRepository;
import com.queuehaven.api.repositories.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/v1/guilds")
public class GuildController {

    private final UserMapper userMapper;
    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public GuildController(
            UserMapper userMapper,
            UserRepository userRepository,
            EventRepository eventRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    @GetMapping("/{guildName}")
    @Secured("ROLE_USER")
    public ResponseEntity getGuildByGuildName(@PathVariable String guildName) {
        List<User> guildMembers = userRepository.findByGuild(guildName);

        if (guildMembers.isEmpty()) {
            GuildDTO guild = GuildDTO.create()
                    .setName(guildName);

            return ResponseEntity.ok(guild);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
