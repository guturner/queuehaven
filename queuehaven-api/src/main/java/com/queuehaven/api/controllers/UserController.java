package com.queuehaven.api.controllers;

import com.queuehaven.api.dtos.UserDTO;
import com.queuehaven.api.entities.User;
import com.queuehaven.api.mappers.UserMapper;
import com.queuehaven.api.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserController(
            UserMapper userMapper,
            UserRepository userRepository) {
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @GetMapping("username/{username}")
    public ResponseEntity getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username.toLowerCase())
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity createNewUser(@RequestBody UserDTO userDTO) {
        return userMapper.asUser(userDTO)
                .map(userRepository::save)
                .map(user -> ResponseEntity.status(201).build())
                .orElse(ResponseEntity.badRequest().build());

    }
}
