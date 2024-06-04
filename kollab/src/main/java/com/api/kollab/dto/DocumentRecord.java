package com.api.kollab.dto;

import java.time.LocalDateTime;

public record DocumentRecord(
    String projectId, 
    String userId, 
    String documentName, 
    String documentExtension, 
    String documentContent, 
    LocalDateTime uploadTime
) {}
