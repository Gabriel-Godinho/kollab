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
import java.util.List;

@Document(collection = "projects")
@NoArgsConstructor @AllArgsConstructor
@ToString @EqualsAndHashCode
@Getter @Setter
public class Project implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @ToString.Exclude
    private String id;

    @Indexed(direction = IndexDirection.ASCENDING)
    @Field("projectName")
    private String projectName;

    @Field("projectDescription")
    private String projectDescription;

    @Indexed(direction = IndexDirection.ASCENDING)
    @Field("adminUser")
    private String adminUser;

    @Field("members")
    private List<String> members;

    @Field("creationDate")
    private LocalDateTime creationDate;

}
