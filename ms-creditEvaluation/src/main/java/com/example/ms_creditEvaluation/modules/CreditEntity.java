package com.example.ms_creditEvaluation.modules;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreditEntity {
    private Long id;
    private String creditType;
    private int maxTerm;
    private float interestRate;
    private int requestedAmount;
    private int approvedAmount;
    private String status;
    private Date applicationDate = new Date() ;
    private Date approvedRejectionDate;
    private int totalCreditCost;

    private Long userId;
    private Long creditEvaluationId;
}
