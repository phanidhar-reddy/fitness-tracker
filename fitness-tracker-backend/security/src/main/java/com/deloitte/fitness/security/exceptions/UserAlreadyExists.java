package com.deloitte.fitness.security.exceptions;


import org.springframework.security.core.AuthenticationException;

public class UserAlreadyExists extends AuthenticationException {
    public UserAlreadyExists(String msg) {
        super(msg);
    }

    public UserAlreadyExists(String msg, Throwable t) {
        super(msg, t);
    }
}
