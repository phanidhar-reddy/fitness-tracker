package com.deloitte.fitness.security.bo.impl;

import com.deloitte.fitness.security.bo.AuthenticationService;
import com.deloitte.fitness.security.bo.UserService;
import com.deloitte.fitness.security.entities.dto.AuthenticationDto;
import com.deloitte.fitness.security.entities.dto.UserDto;
import com.deloitte.fitness.security.entities.responses.AuthrizationResponse;
import com.deloitte.fitness.security.utills.security.JwtUtills;
import lombok.AllArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtills jwtUtills;
    private final UserService userService;


    @Override
    public void authorize(AuthenticationDto authenticationDto) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(authenticationDto.getUsername(), authenticationDto.getPassword())
        );
    }

    @Override
    public AuthrizationResponse genrateResponseJwt(String username) throws ChangeSetPersister.NotFoundException {
        UserDto userDto = userService.findByUserName(username);
        return AuthrizationResponse.builder().jwtToken(jwtUtills.generateToken(userDto)).build();
    }

    @Override
    public String refreshToken(String jwtToken) {
        return jwtUtills.refreshToken(jwtToken);
    }
}
