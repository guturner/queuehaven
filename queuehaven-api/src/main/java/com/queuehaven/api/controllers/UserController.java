package com.queuehaven.api.controllers;

import com.queuehaven.api.dtos.UserDTO;
import com.queuehaven.api.mappers.UserMapper;
import com.queuehaven.api.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping
    public ResponseEntity createNewUser(@RequestBody  UserDTO userDTO) {
        userRepository.save(userMapper.asUser(userDTO));
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }
}
