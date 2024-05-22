package com.api.kollab.controllers;

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

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/1.0/users")
public class UserController {

    private static final String ON_SUCCESS_MESSAGE = "Success!";
    private static final String NOT_FOUND_MESSAGE = "User not found!";

    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<Object> getAllUsers(@PageableDefault(size = 5, sort = "registrationDate", direction = Sort.Direction.ASC) Pageable pageable) {
        return ResponseEntity.ok(userService.findAllUsers(pageable));
    }

    @GetMapping("/user-id/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable(value = "id") String id) {
        Optional<User> user = userService.findById(id);

        return user.<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(NOT_FOUND_MESSAGE));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Object> getUserByEmail(@PathVariable(value = "email") String email) {
        Optional<User> user = userService.findUserByEmail(email);

        return user.<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(NOT_FOUND_MESSAGE));
    }

    @PostMapping("/singup")
    public ResponseEntity<Object> saveUser(@RequestBody UserRecord user) {
        final String encodedPassword = userService.hashPassword(user.userPassword());

        User newUser = new User();
        newUser.setUsername(user.username());
        newUser.setEmail(user.email());
        newUser.setUserPassword(encodedPassword);
        newUser.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(newUser));
    }

    @PutMapping("/update-password/{id}/{newPassword}")
    public ResponseEntity<Object> updateUserPassword(@PathVariable("id") String id, @PathVariable("newPassword") String newPassword) {
        Optional<User> savedUser = userService.findById(id);

        if (savedUser.isPresent()) {
            User updatedUser = savedUser.get();
            updatedUser.setUserPassword(userService.hashPassword(newPassword));

            userService.updateUser(updatedUser);

            return ResponseEntity.ok(ON_SUCCESS_MESSAGE);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(NOT_FOUND_MESSAGE);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") String id) {
        Optional<User> userOptional = userService.findById(id);

        if (userOptional.isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.ok(ON_SUCCESS_MESSAGE);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(NOT_FOUND_MESSAGE);
    }

}
