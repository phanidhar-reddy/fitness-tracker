package com.deloitte.fitness.security.repository;

import com.deloitte.fitness.security.entities.documents.UserInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserInfoRepository extends MongoRepository<UserInfo, String> {
    Optional<UserInfo> findById(String _id);
    Optional<UserInfo> findByEmailAndPassword(String email , String password);
    Optional<UserInfo> findByEmail(String email);
    Boolean existsByEmail(String email);
}
