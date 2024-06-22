package com.api.kollab.dto;

import java.time.LocalDateTime;

public record UploadedDocumentRecord(
    String projectId, 
    String userId, 
    String documentName, 
    String documentExtension, 
    String documentContent, 
    LocalDateTime uploadTime
) {}
