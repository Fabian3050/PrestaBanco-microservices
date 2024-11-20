package com.example.ms_user.repositories;

import com.example.ms_user.entitities.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserEntity,Long> {
    @Override
    Optional<UserEntity> findById(Long userId);
}
