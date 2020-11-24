package com.deloitte.fitness.dite.entity.mapper;

import com.deloitte.fitness.dite.entity.document.DiteDocument;
import com.deloitte.fitness.dite.entity.dto.DiteDto;
import org.mapstruct.Mapper;
import org.mapstruct.ReportingPolicy;

import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface DiteMapper {
    DiteDocument toDocument(DiteDto diteDto);

    DiteDto toDto(DiteDocument diteDocument);

    List<DiteDocument> toDocuments(List<DiteDto> diteDtos);

    List<DiteDto> toDtos(List<DiteDocument> diteDocuments);


}
