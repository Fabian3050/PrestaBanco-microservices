package com.example.ms_user.modules;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Credit {
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
    private List<Document> documents;
    private Long userID;
    private Long creditEvaluationID;
}
