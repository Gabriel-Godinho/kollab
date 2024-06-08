package com.api.kollab.models;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.IndexDirection;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.io.Serializable;
import java.time.LocalDateTime;

@Document(collection = "documents")
@NoArgsConstructor @AllArgsConstructor
@ToString @EqualsAndHashCode
@Getter @Setter
public class Document implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    @Id
    @ToString.Exclude
    private String id;

    @Field("project_id")
    private String projectId;

    @Field("user_id")
    private String userId;

    @Field("documentName")
    private String documentName;

    @Field("documentExtension")
    private String documentExtension;

    @Field("documentContent")
    private String documentContent;

    @Field("uploadDate")
    private LocalDateTime uploadDate;

}
