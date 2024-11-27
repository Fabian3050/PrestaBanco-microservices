package com.example.ms_status.repositories;

import com.example.ms_status.entities.StatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusRepository extends JpaRepository<StatusEntity,Long> {
    @Override
    Optional<StatusEntity> findById(Long id);

    Optional<StatusEntity> findByCreditId(Long creditId);
}
