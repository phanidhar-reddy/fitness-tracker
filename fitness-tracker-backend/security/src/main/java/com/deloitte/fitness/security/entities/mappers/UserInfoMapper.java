package com.deloitte.fitness.security.entities.mappers;

import com.deloitte.fitness.security.entities.documents.UserInfo;
import com.deloitte.fitness.security.entities.dto.UserDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface UserInfoMapper {
    UserInfo toDocument(UserDto userDto);
    UserDto toDto(UserInfo userInfo);
    List<UserInfo> toDocuments(List<UserDto> userDtos);
    List<UserDto> toDtos(List<UserInfo> userInfos);
}
