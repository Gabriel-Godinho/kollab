package com.api.kollab.controllers;

import com.api.kollab.dto.CommentRecord;
import com.api.kollab.models.Comment;
import com.api.kollab.services.CommentService;
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
@RequestMapping("/api/1.0/comment")
public class CommentController {

    private static final String NOT_FOUND_MESSAGE = "Comments not found!";

    @Autowired
    CommentService commentService;

    @GetMapping("/all/{projectId}/{email}")
    public ResponseEntity<Object> getCommentsByUserAndProject(@PathVariable("projectId") String projectId, @PathVariable("email") String email) {
        Optional<List<Comment>> commentsList = commentService.findCommentsByUserAndProject(projectId, email);

        return commentsList.<ResponseEntity<Object>>map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(NOT_FOUND_MESSAGE));
    }

    @PostMapping("/save")
    public ResponseEntity<Object> saveComment(@RequestBody CommentRecord commentRecord) {
        Comment newComment = new Comment();
        newComment.setProjectId(commentRecord.projectId());
        newComment.setUserId(commentRecord.userId());
        newComment.setComment(commentRecord.comment());
        newComment.setPublishDate(LocalDateTime.now(ZoneId.of("UTC")));

        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.saveComment(newComment));
    }

}
