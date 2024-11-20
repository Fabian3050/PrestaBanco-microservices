package com.example.ms_credit.repositories;

import com.example.ms_credit.entities.CreditEntity;
import org.hibernate.metamodel.model.convert.spi.JpaAttributeConverter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CreditRepository extends JpaRepository<CreditEntity,Integer> {
    Optional<CreditEntity> findById(Integer creditId);
}
