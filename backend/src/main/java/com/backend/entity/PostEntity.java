package com.backend.entity;

import java.util.UUID;
import org.hibernate.annotations.UuidGenerator;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "posts")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PostEntity {

    @Id
    @UuidGenerator
    private UUID id;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String post;

    private String name;
    private String email;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String image;

    private String profilePic;
    private String timeStamp;
}
