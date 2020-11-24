package com.deloitte.fitness.dite.services.impl;

import com.deloitte.fitness.dite.entity.dto.DiteDto;
import com.deloitte.fitness.dite.entity.mapper.DiteMapper;
import com.deloitte.fitness.dite.repository.DiteRepository;
import com.deloitte.fitness.dite.services.DiteService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class DiteServiceImpl implements DiteService {
    private final DiteRepository diteRepository;
    private final DiteMapper diteMapper;

    @Override
    public List<DiteDto> getExerciseDataByEmpId(String userId) {
        return diteMapper.toDtos(diteRepository.findByUserKey(userId));
    }

    @Override
    public DiteDto saveExerciseData(DiteDto diteDto) {
        return diteMapper.toDto(
                diteRepository.save(
                        diteMapper.toDocument(diteDto)));
    }

    @Override
    public void deleteExerciseData(DiteDto diteDto) {
        diteRepository.deleteById(diteDto.get_id());
    }
}
