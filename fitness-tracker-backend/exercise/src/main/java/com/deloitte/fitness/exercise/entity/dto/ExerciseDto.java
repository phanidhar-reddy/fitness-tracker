package com.deloitte.fitness.exercise.entity.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
public class ExerciseDto {
    private String _id;
    private String userKey;
    private LocalDate date;
    private Long cardio;
    private Long weightLift;
    private Long yoga;
    private Long other;
}
