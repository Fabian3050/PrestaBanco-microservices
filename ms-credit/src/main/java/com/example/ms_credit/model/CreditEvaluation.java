package com.example.ms_credit.model;

import com.example.ms_credit.entities.CreditEntity;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditEvaluation {
    private int id;

    private Boolean ratioFeeIncome;
    private Boolean creditHistory;
    private Boolean jobSeniority;
    private Boolean ratioDebtIncome;
    private Boolean maximumFinancingAmount;
    private Boolean applicantAge;
    private Boolean savingCapacity;

    private int creditId;
}
