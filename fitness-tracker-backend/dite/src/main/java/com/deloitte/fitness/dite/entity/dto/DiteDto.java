package com.deloitte.fitness.dite.entity.dto;

import lombok.*;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
public class DiteDto {
    private String _id;
    private String userKey;
    private Long breakFast;
    private LocalDate date;
    private Long lunch;
    private Long snacks;
    private Long dinner;
}
