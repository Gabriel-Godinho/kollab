package com.api.kollab.dto;

import java.util.List;

public record ProjectRecord(
    String projectName, 
    String adminUser, 
    List<String> members
) {}
