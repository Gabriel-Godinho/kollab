package com.api.kollab.dto;

import java.time.LocalDateTime;

public record CommentRecord(
    String projectId,
    String userId,
    String comment,
    LocalDateTime publishDate
) {}
