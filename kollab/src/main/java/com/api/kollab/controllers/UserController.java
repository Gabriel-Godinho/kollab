package com.api.kollab.controllers;

import com.api.kollab.configs.SecurityConfiguration;
import com.api.kollab.dto.UserRecord;
import com.api.kollab.models.User;
import com.api.kollab.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/1.0/users")
public class UserController {

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<Object> getAllUsers(@PageableDefault(size = 5, sort = "id", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAllUsers(pageable));
    }

    @GetMapping("/user-id/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable(value = "id") UUID id) {
        final String notFoundMessage = "User not found!";
        Optional<User> parkingSpotModelOptional = userService.findById(id);

        return parkingSpotModelOptional.<ResponseEntity<Object>>map(parkingSpot -> ResponseEntity.status(HttpStatus.OK).body(parkingSpot)).orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(notFoundMessage));
    }

    @PostMapping("/singup")
    public ResponseEntity<Object> saveUser(@RequestBody UserRecord user) {
        final String encodedPassword = SecurityConfiguration.passwordEncoder().encode(user.userPassword());

        User newUser = new User();
        newUser.setUsername(user.username());
        newUser.setEmail(user.email());
        newUser.setUserPassword(encodedPassword);
        newUser.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(newUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") UUID id) {
        final String notFoundMessage = "User not found to delete!";
        final String onSuccessMessage = "User deleted successfully!";
        Optional<User> userOptional = userService.findById(id);

        if (userOptional.isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(onSuccessMessage);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(notFoundMessage);
    }

}
