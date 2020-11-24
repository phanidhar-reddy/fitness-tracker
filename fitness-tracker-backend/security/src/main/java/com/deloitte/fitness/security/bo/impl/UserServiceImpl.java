package com.deloitte.fitness.security.bo.impl;

import com.deloitte.fitness.security.bo.UserService;
import com.deloitte.fitness.security.entities.documents.UserInfo;
import com.deloitte.fitness.security.entities.dto.UserDto;
import com.deloitte.fitness.security.entities.mappers.UserInfoMapper;
import com.deloitte.fitness.security.exceptions.UserAlreadyExists;
import com.deloitte.fitness.security.repository.UserInfoRepository;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserInfoRepository userInfoRepository;
    private final UserInfoMapper userInfoMapper;

    @Override
    public UserDto saveUserService(UserDto userDto) {
        UserInfo userInfo = userInfoMapper.toDocument(userDto);
        return userInfoMapper.toDto(userInfoRepository.save(userInfo));
    }

    @Override
    public UserDto insertUnserService(UserDto userDto) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        userDto.setPassword(passwordEncoder.encode(userDto.getPassword()));
        if(userInfoRepository.existsByEmail(userDto.getEmail())) {
            throw new UserAlreadyExists("User Already Found");
        }
        UserInfo userInfo = userInfoMapper.toDocument(userDto);
        userDto = userInfoMapper.toDto(userInfoRepository.save(userInfo));
        return userDto;
    }


    @Override
    public UserDto findByUserName(String userName) throws ChangeSetPersister.NotFoundException {
        return userInfoMapper.toDto(userInfoRepository.findByEmail(userName)
                .orElseThrow(ChangeSetPersister.NotFoundException::new));
    }

    @Override
    public UserDto findByEmailAndPassword(String email, String password) throws ChangeSetPersister.NotFoundException {
        return userInfoMapper.toDto(userInfoRepository.findByEmailAndPassword(email, password)
                .orElseThrow(ChangeSetPersister.NotFoundException::new));
    }

    /**
     * Locates the user based on the username. In the actual implementation, the search
     * may possibly be case sensitive, or case insensitive depending on how the
     * implementation instance is configured. In this case, the <code>UserDetails</code>
     * object that comes back may have a username that is of a different case than what
     * was actually requested..
     *
     * @param username the username identifying the user whose data is required.
     * @return a fully populated user record (never <code>null</code>)
     * @throws UsernameNotFoundException if the user could not be found or the user has no
     *                                   GrantedAuthority
     */
    @SneakyThrows
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return findByUserName(username);
    }
}
