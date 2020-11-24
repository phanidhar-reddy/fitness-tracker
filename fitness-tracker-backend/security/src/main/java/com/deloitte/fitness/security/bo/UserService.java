package com.deloitte.fitness.security.bo;


import com.deloitte.fitness.security.entities.dto.UserDto;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.UserDetailsService;

public interface UserService extends UserDetailsService {
    UserDto saveUserService(UserDto userDto);
    UserDto insertUnserService(UserDto userDto);
    UserDto findByUserName(String userName) throws ChangeSetPersister.NotFoundException;
    UserDto findByEmailAndPassword(String email , String password) throws ChangeSetPersister.NotFoundException;
}
