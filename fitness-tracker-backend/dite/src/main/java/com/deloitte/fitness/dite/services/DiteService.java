package com.deloitte.fitness.dite.services;

import com.deloitte.fitness.dite.entity.dto.DiteDto;

import java.util.List;

public interface DiteService {
    List<DiteDto> getExerciseDataByEmpId(String userId);

    DiteDto saveExerciseData(DiteDto diteDto);

    void deleteExerciseData(DiteDto diteDto);
}
