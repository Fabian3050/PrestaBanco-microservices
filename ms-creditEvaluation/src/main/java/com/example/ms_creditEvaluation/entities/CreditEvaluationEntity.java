package com.example.ms_creditEvaluation.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
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
@Table(name = "credit_evaluation")
public class CreditEvaluationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Boolean ratioFeeIncome;
    private Boolean creditHistory;
    private Boolean jobSeniority;
    private Boolean ratioDebtIncome;
    private Boolean maximumFinancingAmount;
    private Boolean applicantAge;
    private Boolean savingCapacity;
    private Long creditId;
}
