package com.example.ms_totalCost.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "status")
public class TotalCreditEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int totalCost;
    private float creditLifeInsurance;
    private int fireInsurance;
    private float commission;

    private Long userId;
    private Long creditId;
}
