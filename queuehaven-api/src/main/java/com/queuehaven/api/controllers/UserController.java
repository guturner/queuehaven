package com.queuehaven.api.controllers;

import com.queuehaven.api.dtos.UserDTO;
import com.queuehaven.api.entities.User;
import com.queuehaven.api.mappers.UserMapper;
import com.queuehaven.api.repositories.UserRepository;
import com.queuehaven.api.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    private final AuthService authService;
    private final UserMapper userMapper;
    private final UserRepository userRepository;

    public UserController(
            AuthService authService,
            UserMapper userMapper,
            UserRepository userRepository) {
        this.authService = authService;
        this.userMapper = userMapper;
        this.userRepository = userRepository;
    }

    @GetMapping("username/{username}")
    @Secured("ROLE_SERVICE")
    public ResponseEntity getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username.toLowerCase())
                .map(userMapper::asUserDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("current")
    @Secured("ROLE_USER")
    public ResponseEntity getCurrentUser(Principal principal) {
        return userRepository.findByUsername(principal.getName().toLowerCase())
                .map(userMapper::asUserDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    @Secured("ROLE_SERVICE")
    public ResponseEntity createNewUser(@RequestBody UserDTO userDTO) {
        Optional<User> existingUser = userRepository.findByUsername(userDTO.getUsername().toLowerCase());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }

        return userMapper.asUser(userDTO)
                .map(user -> user.setPassword(authService.encodePassword(userDTO.getPassword())))
                .map(userRepository::save)
                .map(user -> ResponseEntity.status(201).build())
                .orElse(ResponseEntity.badRequest().build());

    }
}
