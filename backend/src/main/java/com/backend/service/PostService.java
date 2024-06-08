package com.backend.service;

import java.util.List;

// import org.springframework.stereotype.Service;

import com.backend.model.Post;

public interface PostService {

    Post addPost(Post post) throws Exception;

    List<Post> getPosts();

}
