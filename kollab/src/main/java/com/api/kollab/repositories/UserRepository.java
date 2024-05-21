package com.api.kollab.repositories;

import com.api.kollab.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends MongoRepository<User, UUID> {

    @Query("{email: '?0'}")
    Optional<User> findUserByEmail(String email);

}
