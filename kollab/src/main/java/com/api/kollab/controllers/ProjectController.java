package com.api.kollab.controllers;

import com.api.kollab.dto.ProjectRecord;
import com.api.kollab.models.Project;
import com.api.kollab.services.ProjectService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*", maxAge = 3600)
@RequestMapping("/api/1.0/project")
public class ProjectController {

    private static final String NOT_FOUND_MESSAGE = "Project not found!";

    @Autowired
    ProjectService projectService;

    @GetMapping("/{adminUser}")
    public ResponseEntity<Object> getProjectsByAdminUser(@PathVariable(value = "adminUser") String adminUser) {
        Optional<List<Project>> projectsList = projectService.findProjectByAdminUser(adminUser);

        return projectsList.<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(NOT_FOUND_MESSAGE));
    }

    @GetMapping("/member/{email}")
    public ResponseEntity<Object> getProjectWhereUserIsMember(@PathVariable(value = "email") String email) {
        Optional<List<Project>> projectsWhereUserIsMember = projectService.findProjectWhereUserIsMember(email);

        return projectsWhereUserIsMember.<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(NOT_FOUND_MESSAGE));
    }

    @PostMapping("/create")
    public ResponseEntity<Object> saveProject(@RequestBody ProjectRecord projectRecord) {
        Project newProject = new Project();
        newProject.setProjectName(projectRecord.projectName());
        newProject.setProjectDescription(projectRecord.projectDescription());
        newProject.setAdminUser(projectRecord.adminUser());
        newProject.setMembers(projectRecord.members());
        newProject.setCreationDate(LocalDateTime.now(ZoneId.of("UTC")));

        return ResponseEntity.status(HttpStatus.CREATED).body(projectService.saveProject(newProject));
    }

}
