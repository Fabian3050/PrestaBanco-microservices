package com.example.ms_totalCost.repositories;

import com.example.ms_totalCost.entities.TotalCreditEntity;
import com.example.ms_totalCost.models.CreditEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TotalCreditRepository extends JpaRepository<TotalCreditEntity,Long> {
    @Override
    Optional<TotalCreditEntity> findById(Long id);

    Optional<TotalCreditEntity> findByCreditId(Long creditId);

    Optional<CreditEntity> findAllByCreditId(Long creditId);
}
