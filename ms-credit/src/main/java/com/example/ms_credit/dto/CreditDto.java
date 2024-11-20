package com.example.ms_credit.dto;

import com.example.ms_credit.model.CreditEvaluation;
import com.example.ms_credit.model.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreditDto {
    private int id;
    private String creditType;
    private int maxTerm;
    private float interestRate;
    private int requestedAmount;
    private int approvedAmount;
    private String status;
    private Date applicationDate;
    private Date approvedRejectionDate;
    private int userId;
    private List<DocumentDto> documents;
    private int creditEvaluationId;
}
