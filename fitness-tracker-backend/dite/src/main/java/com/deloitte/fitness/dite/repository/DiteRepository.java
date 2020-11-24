package com.deloitte.fitness.dite.repository;

import com.deloitte.fitness.dite.entity.document.DiteDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DiteRepository extends MongoRepository<DiteDocument ,String> {
    List<DiteDocument> findByUserKey(String key);
}
