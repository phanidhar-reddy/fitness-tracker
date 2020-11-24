package com.deloitte.fitness.exercise.services;

import com.deloitte.fitness.exercise.entity.dto.ExerciseDto;

import java.util.List;

public interface ExerciseService {
    List<ExerciseDto> getExerciseDataByEmpId(String userId);

    ExerciseDto saveExerciseData(ExerciseDto exerciseDto);

    void deleteExerciseData(ExerciseDto exerciseDto);
}
