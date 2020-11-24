package com.deloitte.fitness.security.controllers;

import com.deloitte.fitness.security.bo.UserService;
import com.deloitte.fitness.security.entities.dto.AuthenticationDto;
import com.deloitte.fitness.security.entities.dto.UserDto;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;

@ExtendWith(MockitoExtension.class)
class UserControllerTest {

    MockMvc mockMvc;

    @InjectMocks
    UserController userController;

    @Mock
    UserService userService;

    UserDto userDto;
    AuthenticationDto authenticationDto;

    ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        objectMapper = new ObjectMapper();
        mockMvc = MockMvcBuilders.standaloneSetup(userController).build();
        userDto = UserDto.builder()
                .email("spreddy")
                .firstName("S")
                .lastName("Reddy")
                .build();
        authenticationDto = AuthenticationDto.builder()
                .password("12345")
                .username("spreddy")
                .build();
    }


    @Test
    @DisplayName("Test To Sign in to data")
    void insertIntoUserInfo() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.put("/user/")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(userDto)))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isCreated());

    }

    @Test
    void getUserDataByUserName() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/user/{username}","spreddy")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(authenticationDto)))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void saveUserInfo() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.post("/user/")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(userDto)))
                .andDo(print())
                .andExpect(MockMvcResultMatchers.status().isAccepted());
    }
}