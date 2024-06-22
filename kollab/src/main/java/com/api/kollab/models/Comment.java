package com.api.kollab.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

@Document("comments")
@NoArgsConstructor @AllArgsConstructor
@ToString @EqualsAndHashCode
@Getter @Setter
public class Comment implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @ToString.Exclude
    private String id;

    @Field("project_id")
    private String projectId;

    @Field("user_id")
    private String userId;

    @Field("comment")
    private String comment;

    @Field("publishDate")
    private LocalDateTime publishDate;

}
