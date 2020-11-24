package com.deloitte.fitness.security.controllers;

import com.deloitte.fitness.security.bo.AuthenticationService;
import com.deloitte.fitness.security.entities.dto.AuthenticationDto;
import com.deloitte.fitness.security.entities.responses.AuthrizationResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

/**
 *   AuthorizationController ALl Authorization related endpoints
 */

@RestController
@RequestMapping("/authorization")
@CrossOrigin
@RequiredArgsConstructor
public class AuthorizationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/authorize")
    public ResponseEntity<AuthrizationResponse> authorizeUser(@RequestBody AuthenticationDto authonicationDto) throws ChangeSetPersister.NotFoundException {
        authenticationService.authorize(authonicationDto);
        return ResponseEntity.ok(authenticationService.genrateResponseJwt(authonicationDto.getUsername()));
    }

    @PostMapping("/validate")
    public ResponseEntity validateToken() throws ChangeSetPersister.NotFoundException {
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping("/refresh")
    public String refreshJwtToken(@RequestBody String jwtToken) {
        return authenticationService.refreshToken(jwtToken);
    }

    @ExceptionHandler(BadCredentialsException.class)
    public ResponseEntity HandleBadCredentialsException(BadCredentialsException badCredentialsException){
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(badCredentialsException.getMessage());
    }
}
