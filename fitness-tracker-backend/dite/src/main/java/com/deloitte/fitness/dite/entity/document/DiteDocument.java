package com.deloitte.fitness.dite.entity.document;

import lombok.*;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@EqualsAndHashCode
@Builder
@Document(collection = "dite")
public class DiteDocument {
    private String _id;
    private String userKey;
    private LocalDate date;
    private Long breakFast;
    private Long lunch;
    private Long snacks;
    private Long dinner;
}
