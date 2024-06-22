package com.api.kollab.services;

import com.api.kollab.models.User;
import com.api.kollab.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.util.Base64;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    public Optional<User> findById(String id){
        return userRepository.findById(id);
    }

    public Optional<User> findUserByEmail(String email) {
        return userRepository.findUserByEmail(email);
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public User saveUser(User newUser) {
        return userRepository.save(newUser);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public void updateUser(User userToUpdate) {
        userRepository.save(userToUpdate);
    }

    @Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.SERIALIZABLE)
    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public final String hashPassword(String rawPassword) {
        return passwordEncoder.encode(rawPassword);
    }

    public final boolean verifyPasswordMatches(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);
    }

    public final String generateToken(String userId) {
        // Gera um token único para um dado userId
        // Gera um UUID aleatório
        String randomUUID = UUID.randomUUID().toString();

        // Obtém o timestamp atual em segundos
        long timestamp = Instant.now().getEpochSecond();

        // Concatena o userId, o timestamp e o UUID
        String token = userId + "-" + timestamp + "-" + randomUUID;

        // Codifica o token em Base64 para tornar o formato mais amigável
        return Base64.getUrlEncoder().withoutPadding().encodeToString(token.getBytes(StandardCharsets.UTF_8));
    }

}
