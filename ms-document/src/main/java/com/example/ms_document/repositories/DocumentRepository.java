package com.example.ms_document.repositories;

import com.example.ms_document.entities.DocumentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DocumentRepository extends JpaRepository<DocumentEntity,Long> {
    @Override
    Optional<DocumentEntity> findById(Long id);

    Optional<List<DocumentEntity>> findAllByCreditId(Long creditId);
}
