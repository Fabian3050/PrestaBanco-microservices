package com.example.ms_credit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditDto {
    private Long id;
    private String creditType;
    private int maxTerm;
    private float interestRate;
    private int requestedAmount;
    private int approvedAmount;
    private String status;
    private Date applicationDate;
    private Date approvedRejectionDate;
    private Long userId;
    private List<DocumentDto> documents;
    private Long creditEvaluationId;
}
