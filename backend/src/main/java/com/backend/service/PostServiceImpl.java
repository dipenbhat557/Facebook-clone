package com.backend.service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.backend.entity.PostEntity;
import com.backend.model.Post;
import com.backend.repository.PostRepository;

@Service
public class PostServiceImpl implements PostService {

    @Autowired
    private PostRepository postRepository;

    @Override
    public Post addPost(Post post) throws Exception {
        System.out.println("I am inside add post");
        try {

            PostEntity postEntity = new PostEntity();
            BeanUtils.copyProperties(post, postEntity);
            System.out.println("The prevois post is " + post + " The later post is " + postEntity);

            if (post.getFile() != null && !post.getFile().equalsIgnoreCase("null"))
                postEntity.setImage(post.getFile());
            else
                postEntity.setImage(null);

            postEntity.setTimeStamp(LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")));
            System.out.println("The time stamp is " + postEntity.getTimeStamp());

            postEntity = postRepository.save(postEntity);

            post.setId(postEntity.getId());

            post.setFile(null);
            post.setImage(postEntity.getImage());
            post.setTimeStamp(postEntity.getTimeStamp());

        } catch (Exception e) {
            System.out.println("Some error occured " + e);
            throw new Exception("Could not save post");
        }
        return post;
    }

    @Override
    public List<Post> getPosts() {
        List<PostEntity> postEntities = postRepository.findAll();

        List<Post> posts = new ArrayList<>();

        posts = postEntities.stream().map((postEntity) -> Post.builder()
                .id(postEntity.getId())
                .timeStamp(postEntity.getTimeStamp())
                .email(postEntity.getEmail())
                .name(postEntity.getName())
                .post(postEntity.getPost())
                .image(postEntity.getImage())
                .profilePic(postEntity.getProfilePic())
                .build())
                .collect(Collectors.toList());

        return posts;
    }
}
