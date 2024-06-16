package com.api.kollab.repositories;

import com.api.kollab.models.Project;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {

    @Query("{projectName: '?0'}")
    Optional<Project> findProjectByName(String projectName);

    @Query("{adminUser: '?0'}")
    Optional<List<Project>> findProjectByAdminUser(String adminUser);

    @Query("{members: '?0'}")
    Optional<List<Project>> findProjectWhereUserIsMember(String email);

}
