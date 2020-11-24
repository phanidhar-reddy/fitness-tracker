package com.deloitte.fitness.exercise.repository;

import com.deloitte.fitness.exercise.entity.document.ExerciseDocument;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseRepository extends MongoRepository<ExerciseDocument,String> {
     List<ExerciseDocument> findByuserKey(String key);
}
