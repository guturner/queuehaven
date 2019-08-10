package com.queuehaven.api.mappers;

import com.queuehaven.api.dtos.UserDTO;
import com.queuehaven.api.entities.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public User asUser(UserDTO userDTO) {
        return User.create(userDTO.getUsername());
    }
}
