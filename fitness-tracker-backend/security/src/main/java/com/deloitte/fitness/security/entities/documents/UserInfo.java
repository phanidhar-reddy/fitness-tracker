package com.deloitte.fitness.security.entities.documents;

import com.fasterxml.jackson.annotation.JsonIgnore;
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
@Document(collection = "userInfo")
public class UserInfo {

    @Id
    private String _id;
    private String email;
    @JsonIgnore
    private String password;
    private Long phoneNumber;
    private String firstName;
    private String lastName;
    private LocalDate dob;
    private String gender;

}
