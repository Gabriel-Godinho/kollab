package com.api.kollab.repositories;

import com.api.kollab.models.Comment;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CommentRepository extends MongoRepository<Comment, String> {

    @Query("{ $and [ { project_id: '?0' }, { user_id: '?1' } ] }")
    Optional<List<Comment>> findCommentsByUserAndProject(String projectId, String userId);

}
