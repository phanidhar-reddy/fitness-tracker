package com.deloitte.fitness.exercise.entity.document;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
@Document(collection = "exercise")
public class ExerciseDocument {
    @Id
    private String _id;
    private String userKey;
    private LocalDate date;
    private Long cardio;
    private Long weightLift;
    private Long yoga;
    private Long other;
}
