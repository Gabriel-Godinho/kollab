package com.api.kollab.services;

import com.api.kollab.models.Project;
import com.api.kollab.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProjectService {

    @Autowired
    ProjectRepository projectRepository;

    public Project saveProject(Project newProject) {
        return projectRepository.save(newProject);
    }

    public Optional<Project> findProjectByName(String projectName) {
        return projectRepository.findProjectByName(projectName);
    }

    public Optional<List<Project>> findProjectByAdminUser(String adminUser) {
        return projectRepository.findProjectByAdminUser(adminUser);
    }

}
