package com.api.kollab.services;

import com.api.kollab.models.Comment;
import com.api.kollab.repositories.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    @Autowired
    CommentRepository commentRepository;

    public Comment saveComment(Comment newComment) {
        return commentRepository.save(newComment);
    }

    public Optional<List<Comment>> findCommentsByUserAndProject(String projectId, String userId) {
        return commentRepository.findCommentsByUserAndProject(projectId, userId);
    }

}
