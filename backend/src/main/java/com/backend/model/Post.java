package com.backend.model;

import java.util.UUID;

// import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Post {

    private UUID id;
    private String post;
    private String name;
    private String email;
    private String image;
    private String profilePic;
    private String timeStamp;
    private String file;
}
