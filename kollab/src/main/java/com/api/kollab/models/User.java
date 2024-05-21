package com.api.kollab.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Document(collection = "users")
@NoArgsConstructor @AllArgsConstructor
@ToString @EqualsAndHashCode
@Getter @Setter
public class User implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @ToString.Exclude
    private String id;

    @Field("username")
    private String username;

    @Field("userPassword")
    private String userPassword;

    @Indexed(direction = IndexDirection.ASCENDING, unique = true)
    @Field("email")
    private String email;

    @Field("registrationDate")
    private LocalDateTime registrationDate;

}
