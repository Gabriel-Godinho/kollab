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
import org.springframework.security.crypto.password.PasswordEncoder;
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
        return ResponseEntity.status(HttpStatus.OK).body(userService.findAllUsers(pageable));
    }

    @GetMapping("/user-id/{id}")
    public ResponseEntity<Object> getUserById(@PathVariable(value = "id") String id) {
        Optional<User> user = userService.findById(id);

        return user.<ResponseEntity<Object>>map(u -> ResponseEntity.status(HttpStatus.OK).body(u))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(NOT_FOUND_MESSAGE));
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<Object> getUserByEmail(@PathVariable(value = "email") String email) {
        Optional<User> user = userService.findUserByEmail(email);

        return user.<ResponseEntity<Object>>map(u -> ResponseEntity.status(HttpStatus.OK).body(u))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(NOT_FOUND_MESSAGE));
    }

    @PostMapping("/singup")
    public ResponseEntity<Object> saveUser(@RequestBody UserRecord user) {
        final String encodedPassword = userService.hashPassword(user.userPassword());;

        User newUser = new User();
        newUser.setUsername(user.username());
        newUser.setEmail(user.email());
        newUser.setUserPassword(encodedPassword);
        newUser.setRegistrationDate(LocalDateTime.now(ZoneId.of("UTC")));

        return ResponseEntity.status(HttpStatus.CREATED).body(userService.saveUser(newUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteUser(@PathVariable(value = "id") String id) {
        Optional<User> userOptional = userService.findById(id);

        if (userOptional.isPresent()) {
            userService.deleteUser(id);
            return ResponseEntity.status(HttpStatus.OK).body(ON_SUCCESS_MESSAGE);
        }

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(NOT_FOUND_MESSAGE);
    }

}
