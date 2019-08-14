package com.queuehaven.api.mappers;

import com.queuehaven.api.dtos.UserDTO;
import com.queuehaven.api.entities.User;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class UserMapper {

    public Optional<User> asUser(UserDTO userDTO) {
        if (userDTO == null) {
            return Optional.empty();
        } else {
            return Optional.of(User.create(userDTO.getUsername()));
        }
    }

    public Optional<UserDTO> asUserDTO(User user) {
        if (user == null) {
            return Optional.empty();
        } else {
            return Optional.of(UserDTO.create(user.getUsername()));
        }
    }
}
