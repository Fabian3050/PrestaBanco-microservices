package com.example.ms_simulate.repositories;

import com.example.ms_simulate.entities.SimulateEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimulateRepository extends JpaRepository<SimulateEntity,Long> {
}
