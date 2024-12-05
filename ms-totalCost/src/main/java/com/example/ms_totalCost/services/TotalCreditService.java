package com.example.ms_totalCost.services;

import com.example.ms_totalCost.entities.TotalCreditEntity;
import com.example.ms_totalCost.models.CreditEntity;
import com.example.ms_totalCost.repositories.TotalCreditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.math.BigDecimal;
import java.util.Optional;

@Service
public class TotalCreditService {
    @Autowired
    TotalCreditRepository totalCreditRepository;

    private RestTemplate restTemplate = new RestTemplate();

    public int getCreditTotalCost(TotalCreditEntity totalCreditEntity, Long creditId) {
        CreditEntity credit;
        try {
            credit = restTemplate.getForObject("http://localhost:8080/credit/getById/" + creditId, CreditEntity.class);
        } catch (Exception e) {
            throw new RuntimeException("Error fetching credit details", e);
        }

        BigDecimal requestedAmount = BigDecimal.valueOf(credit.getRequestedAmount());
        int maxTerm = credit.getMaxTerm();
        BigDecimal interestRate = BigDecimal.valueOf(credit.getTotalCreditCost());
        totalCreditEntity.setCreditLifeInsurance(requestedAmount.multiply(BigDecimal.valueOf(0.0003)).floatValue());
        totalCreditEntity.setFireInsurance(20000);
        totalCreditEntity.setCommission(requestedAmount.multiply(BigDecimal.valueOf(0.001)).floatValue());

        BigDecimal onePlusInterestRate = interestRate.add(BigDecimal.ONE);
        BigDecimal power = onePlusInterestRate.pow(maxTerm);
        BigDecimal monthlyPayment = requestedAmount.multiply(interestRate.multiply(power).divide(power.subtract(BigDecimal.ONE), BigDecimal.ROUND_HALF_UP))
                .add(BigDecimal.valueOf(totalCreditEntity.getCreditLifeInsurance()))
                .add(BigDecimal.valueOf(totalCreditEntity.getFireInsurance()));
        int totalCost = monthlyPayment.multiply(BigDecimal.valueOf(maxTerm)).add(BigDecimal.valueOf(totalCreditEntity.getCommission())).setScale(0, BigDecimal.ROUND_HALF_UP).intValue();

        return totalCost;
    }

    public TotalCreditEntity saveTotalCredit(TotalCreditEntity totalCreditEntity, Long creditId){
        CreditEntity credit = restTemplate.getForObject("http://localhost:8080/credit/getById/" + creditId, CreditEntity.class);
        System.out.print(credit);
        int totalCost = getCreditTotalCost(totalCreditEntity, creditId);
        credit.setTotalCreditCost(totalCost);
        totalCreditEntity.setTotalCost(totalCost);
        totalCreditEntity.setCreditId(creditId);
        return totalCreditRepository.save(totalCreditEntity);
    }

    public TotalCreditEntity getTotalCreditById(Long id){
        return totalCreditRepository.findById(id).get();
    }

    public Optional<TotalCreditEntity> getTotalCreditByCreditId(Long creditId){
        return totalCreditRepository.findByCreditId(creditId);
    }

    public boolean deleteTotalCredit(Long id) throws Exception{
        try{
            totalCreditRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

}
