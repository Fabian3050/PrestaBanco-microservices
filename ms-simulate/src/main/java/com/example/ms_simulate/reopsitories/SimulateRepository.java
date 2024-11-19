package com.example.ms_simulate.reopsitories;

import com.example.ms_simulate.entities.SimulateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface SimulateRepository extends JpaRepository<SimulateEntity, Long> {
    Optional<SimulateEntity> findById(Long simulateId);
}
