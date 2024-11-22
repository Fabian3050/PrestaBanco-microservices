package com.example.ms_creditEvaluation.repositories;

import com.example.ms_creditEvaluation.entities.CreditEvaluationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CreditEvaluationRepository extends JpaRepository<CreditEvaluationEntity, Long> {
    @Override
    Optional<CreditEvaluationEntity> findById(Long id);
}
