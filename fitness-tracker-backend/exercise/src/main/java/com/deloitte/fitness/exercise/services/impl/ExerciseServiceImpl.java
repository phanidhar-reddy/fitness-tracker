package com.deloitte.fitness.exercise.services.impl;


import com.deloitte.fitness.exercise.entity.dto.ExerciseDto;
import com.deloitte.fitness.exercise.entity.mappers.ExerciseMapper;
import com.deloitte.fitness.exercise.repository.ExerciseRepository;
import com.deloitte.fitness.exercise.services.ExerciseService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ExerciseServiceImpl implements ExerciseService {

    private final ExerciseRepository exerciseRepository;
    private final ExerciseMapper exerciseMapper;

    @Override
    public List<ExerciseDto> getExerciseDataByEmpId(String key) {
        return exerciseMapper.toDtos(exerciseRepository.findByuserKey(key));
    }

    @Override
    public ExerciseDto saveExerciseData(ExerciseDto exerciseDto) {
        return exerciseMapper.toDto(exerciseRepository.save(exerciseMapper.toDocument(exerciseDto)));
    }

    @Override
    public void deleteExerciseData(ExerciseDto exerciseDto) {
        exerciseRepository.deleteById(exerciseDto.get_id());
    }
}
