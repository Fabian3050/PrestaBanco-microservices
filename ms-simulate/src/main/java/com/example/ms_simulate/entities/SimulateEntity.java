package com.example.ms_simulate.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "simulate")
public class SimulateEntity {
    @Id
    @Column(name = "id", unique = true, nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private int monthlyFee; //monthly fee
    private int loanAmount; //loan amount
    private int interestRate; //monthly interest rate (anual rate/12/100)
    private int paymentPeriod; //total payment period
    private int totalPriceHome;
    private int monthlyClientIncome;
    private String creditType;
    private String message;
    private int totalCreditCost;
    private int totalMonthlyPay;
}
