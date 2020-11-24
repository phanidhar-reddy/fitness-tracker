package com.deloitte.fitness.exercise.entity.mappers;

import com.deloitte.fitness.exercise.entity.document.ExerciseDocument;
import com.deloitte.fitness.exercise.entity.dto.ExerciseDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;


@Mapper(componentModel = "spring" , unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ExerciseMapper {
    ExerciseDto toDto(ExerciseDocument exerciseDocument);

    ExerciseDocument toDocument(ExerciseDto exerciseDto);

    List<ExerciseDto> toDtos(List<ExerciseDocument> exerciseDocuments);

    List<ExerciseDocument> toDocuments(List<ExerciseDto> exerciseDtos);
}
