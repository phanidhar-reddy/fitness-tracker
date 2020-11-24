package com.deloitte.fitness.security.controllers;

import com.deloitte.fitness.security.bo.UserService;
import com.deloitte.fitness.security.entities.dto.UserDto;
import lombok.RequiredArgsConstructor;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


/**
 * UserController ALl user related endpoints
 */

@RestController
@RequestMapping("/user")
@CrossOrigin
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/{username}")
    public ResponseEntity getUserDataByUserName(@PathVariable String username) throws ChangeSetPersister.NotFoundException {
        return ResponseEntity.ok(userService.findByUserName(username));
    }

    @PutMapping()
    public ResponseEntity insertIntoUserInfo(@RequestBody UserDto userDto){
        return new ResponseEntity(userService.saveUserService(userDto),HttpStatus.CREATED);
    }

    @PostMapping()
    public ResponseEntity saveUserInfo(@RequestBody UserDto userDto){
        return new ResponseEntity(userService.insertUnserService(userDto),HttpStatus.ACCEPTED);
    }
}
