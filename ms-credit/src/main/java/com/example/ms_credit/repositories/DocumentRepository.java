package com.example.ms_credit.repositories;

import com.example.ms_credit.entities.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<DocumentEntity,Long> {
    Optional<DocumentEntity> findById(Long documentId);
}
