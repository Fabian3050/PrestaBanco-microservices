package com.example.ms_simulate.services;

import com.example.ms_simulate.entities.SimulateEntity;
import com.example.ms_simulate.reopsitories.SimulateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class SimulateService {
    @Autowired
    SimulateRepository simulateRepository;

    public SimulateEntity saveSimulate(SimulateEntity simulate){
        return simulateRepository.save(simulate);
    }

    public ArrayList<SimulateEntity> getAllSimulate(){
        return (ArrayList<SimulateEntity>) simulateRepository.findAll();
    }

    public SimulateEntity getSimulateById(Long id){
        return simulateRepository.findById(id).get();
    }

    public float calculateMonthlyPayment(SimulateEntity simulate) {
        // Extract variables from the simulate object
        float principal = simulate.getP();  // Loan amount
        float monthlyRate = simulate.getR()/12/100; // Monthly interest rate
        int paymentPeriod = simulate.getN();   // Number of payments (months)
        double totalPriceHome = simulate.getTotalPriceHome();
        String creditType = simulate.getCreditType();

        // Validate that the values are valid
        if (monthlyRate == 0 || paymentPeriod == 0) {
            throw new IllegalArgumentException("Interest rate and number of payments must be greater than zero.");
        }

        if (creditType.equals("firstHome")) {
            totalPriceHome = totalPriceHome * 0.8;
        }else if (creditType.equals("secondHome")) {
            totalPriceHome = totalPriceHome * 0.7;
        }else if (creditType.equals("commercialProperty")) {
            totalPriceHome = totalPriceHome * 0.6;
        }else if (creditType.equals("remodeling")) {
            totalPriceHome = totalPriceHome * 0.5;
        }

        // Calculate the common power
        double power = Math.pow(1 + monthlyRate, paymentPeriod);

        // Apply the formula to calculate the monthly payment
        float monthlyPayment = (float) (principal * (monthlyRate * power) / (power - 1));

        return monthlyPayment;
    }

    public SimulateEntity getSimulateCredit(Long id){
        SimulateEntity simulate = getSimulateById(id);
        float monthlyFee = this.calculateMonthlyPayment(simulate);
        if (monthlyFee < simulate.getMonthlyClientIncome()) {
            simulate.setM((int) Math.round(monthlyFee));
            simulate.setMessage("Esta en el rango, el cliente puede pagar las cuotas mensuales según sun sueldo ingresado");
        }else{
            simulate.setM((int) Math.round(monthlyFee));
            simulate.setMessage("No esta en el rango, el cliente no puede pagar las cuotas mensuales según su sueldo ingresado");
        }
        return  simulate;
    }

    public SimulateEntity calculateMonthlyPaymentAllCost(Long simulateId){
        SimulateEntity simulate = getSimulateById(simulateId);
        double desgravamen = simulate.getP() * 0.0003;
        double administration = simulate.getP() * 0.01;

        float totaMonthlyPay = (float) (simulate.getM() + desgravamen + administration);
        simulate.setTotalMonthlyPay((int)Math.round(totaMonthlyPay));

        float totalCreditCost = (totaMonthlyPay * simulate.getN() + simulate.getP());
        simulate.setTotalCreditCost((int)Math.round(totalCreditCost));
        return simulate;
    }
}
