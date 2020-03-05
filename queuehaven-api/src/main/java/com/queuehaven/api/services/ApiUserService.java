package com.queuehaven.api.services;

import com.queuehaven.api.config.ServiceAccountConfigProperties;
import com.queuehaven.api.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * This service authenticates users of the API.
 */
@Service
public class ApiUserService implements UserDetailsService {

    private final AuthService authService;
    private final ServiceAccountConfigProperties serviceAccountConfigProperties;
    private final UserRepository userRepository;

    @Autowired
    public ApiUserService(
            AuthService authService,
            ServiceAccountConfigProperties serviceAccountConfigProperties,
            UserRepository userRepository) {
        this.authService = authService;
        this.serviceAccountConfigProperties = serviceAccountConfigProperties;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (serviceAccountConfigProperties.getUsername().equals(username)) {
            return buildServiceAccountUser();
        }

        Optional<com.queuehaven.api.entities.User> userOptional = userRepository.findByUsername(username.toLowerCase());
        if (userOptional.isPresent()) {
            return buildHumanUser(userOptional.get());
        }

        throw new UsernameNotFoundException("username: " + username + " not found.");
    }

    private User buildServiceAccountUser() {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_" + serviceAccountConfigProperties.getRole());

        return new User(serviceAccountConfigProperties.getUsername(), authService.encodePassword(serviceAccountConfigProperties.getPassword()), grantedAuthorities);
    }

    private User buildHumanUser(com.queuehaven.api.entities.User user) {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");

        return new User(user.getUsername(), user.getPassword(), grantedAuthorities);
    }
}
