package com.deloitte.fitness.dite.comtrollers;

import com.deloitte.fitness.dite.entity.dto.DiteDto;
import com.deloitte.fitness.dite.services.DiteService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/dite")
@CrossOrigin(exposedHeaders = {"authorization"})
@AllArgsConstructor
public class DiteController {

    private final DiteService diteService;

    @GetMapping("/{userId}")
    public ResponseEntity getExerciseData(@PathVariable String userId){
        return ResponseEntity.ok(diteService.getExerciseDataByEmpId(userId));
    }

    @PutMapping()
    public ResponseEntity saveExerciseData(@RequestBody DiteDto diteDto){
        return new ResponseEntity(diteService.saveExerciseData(diteDto),
                StringUtils.isEmpty( diteDto.get_id()) ? HttpStatus.CREATED :HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity deleteExerciseData(@RequestBody DiteDto diteDto){
        diteService.deleteExerciseData(diteDto);
        return ResponseEntity.ok(diteDto.get_id());
    }
}
