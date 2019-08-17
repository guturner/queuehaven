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
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * This service authenticates users of the API.
 */
@Service
public class ApiUserService implements UserDetailsService {

    private final BCryptPasswordEncoder encoder;
    private final ServiceAccountConfigProperties serviceAccountConfigProperties;
    private final UserRepository userRepository;

    @Autowired
    public ApiUserService(
            BCryptPasswordEncoder encoder,
            ServiceAccountConfigProperties serviceAccountConfigProperties,
            UserRepository userRepository) {
        this.encoder = encoder;
        this.serviceAccountConfigProperties = serviceAccountConfigProperties;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        if (serviceAccountConfigProperties.getUsername().equals(username)) {
            return buildServiceAccountUser();
        }

        boolean userExists = userRepository.findByUsername(username.toLowerCase()).isPresent();
        if (userExists) {
            return buildHumanUser(username);
        }

        throw new UsernameNotFoundException("username: " + username + " not found.");
    }

    private User buildServiceAccountUser() {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_" + serviceAccountConfigProperties.getRole());

        return new User(serviceAccountConfigProperties.getUsername(), encoder.encode(serviceAccountConfigProperties.getPassword()), grantedAuthorities);
    }

    private User buildHumanUser(String username) {
        List<GrantedAuthority> grantedAuthorities = AuthorityUtils
                .commaSeparatedStringToAuthorityList("ROLE_USER");

        return new User(username, encoder.encode("a"), grantedAuthorities);
    }
}
