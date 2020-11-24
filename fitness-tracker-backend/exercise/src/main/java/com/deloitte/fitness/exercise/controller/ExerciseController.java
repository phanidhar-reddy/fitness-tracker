package com.deloitte.fitness.exercise.controller;

import com.deloitte.fitness.exercise.entity.dto.ExerciseDto;
import com.deloitte.fitness.exercise.services.ExerciseService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/exercise")
@CrossOrigin(exposedHeaders = {"authorization"})
@AllArgsConstructor
public class ExerciseController {

    private final ExerciseService exerciseService;

    @GetMapping("/{userId}")
    public ResponseEntity getExerciseData(@PathVariable String userId){
        return ResponseEntity.ok(exerciseService.getExerciseDataByEmpId(userId));
    }

    @PutMapping()
    public ResponseEntity saveExerciseData(@RequestBody ExerciseDto exerciseDto){
        return new ResponseEntity(exerciseService.saveExerciseData(exerciseDto),
                StringUtils.isEmpty(exerciseDto.get_id()) ? HttpStatus.CREATED : HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity deleteExerciseData(@RequestBody ExerciseDto exerciseDto){
        exerciseService.deleteExerciseData(exerciseDto);
        return ResponseEntity.ok(exerciseDto.get_id());
    }
}
