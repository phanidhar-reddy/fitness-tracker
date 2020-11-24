package com.deloitte.fitness.security.bo;

import com.deloitte.fitness.security.entities.dto.AuthenticationDto;
import com.deloitte.fitness.security.entities.responses.AuthrizationResponse;
import org.springframework.data.crossstore.ChangeSetPersister;

public interface AuthenticationService {
    public void authorize(AuthenticationDto authenticationDto);
    public AuthrizationResponse genrateResponseJwt(String username) throws ChangeSetPersister.NotFoundException;
    String refreshToken(String jwtToken);
}
