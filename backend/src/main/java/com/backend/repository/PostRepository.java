package com.backend.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.backend.entity.PostEntity;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, UUID> {

}
