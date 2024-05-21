package com.api.kollab.dto;

import java.time.LocalDateTime;

public record UserRecord(String username, String userPassword, String email, LocalDateTime registrationDate) {}
