package com.example.ms_credit.repositories;

import com.example.ms_credit.entities.CreditEntity;
import org.hibernate.metamodel.model.convert.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CreditRepository extends JpaRepository<CreditEntity,Long> {
    Optional<CreditEntity> findById(Long creditId);
    Optional<List<CreditEntity>> findAllByUserId(Long userId);
}
