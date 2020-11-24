package com.deloitte.fitness.security.bo.impl;

import com.deloitte.fitness.security.entities.documents.UserInfo;
import com.deloitte.fitness.security.entities.dto.UserDto;
import com.deloitte.fitness.security.entities.mappers.UserInfoMapper;
import com.deloitte.fitness.security.repository.UserInfoRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.crossstore.ChangeSetPersister;

import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;

@ExtendWith(MockitoExtension.class)
class UserServiceImplTest {

    @InjectMocks
    UserServiceImpl userService;

    @Mock
    private  UserInfoRepository userInfoRepository;
    @Spy
    private  UserInfoMapper userInfoMapper = Mappers.getMapper(UserInfoMapper.class);

    UserDto userDto;
    UserInfo userInfo;
    @BeforeEach
    void setUp() {
        userDto = UserDto.builder()
                .email("spreddy")
                .firstName("S")
                .lastName("Reddy")
                .build();

        userInfo =  UserInfo.builder()
                .email("spreddy")
                .firstName("S")
                .lastName("Reddy")
                .build();
    }

    @Test
    void saveUserService() {
        given(userInfoRepository.save(any())).willReturn(Optional.of(userInfo));
        userService.saveUserService(userDto);
    }


    @Test
    void fetchUserInfo() throws ChangeSetPersister.NotFoundException {
        given(userInfoRepository.findByEmail(anyString())).willReturn(Optional.of(userInfo));
        userService.findByUserName("spreddy");
    }

    @Test
    void findByEmailAndPassword() throws ChangeSetPersister.NotFoundException {
        given(userInfoRepository.findByEmailAndPassword(anyString(),anyString())).willReturn(Optional.of(userInfo));
        userService.findByEmailAndPassword("spreddy","12345");
    }

}