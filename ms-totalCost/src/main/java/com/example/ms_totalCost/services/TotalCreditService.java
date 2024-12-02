package com.example.ms_totalCost.services;

import com.example.ms_totalCost.entities.TotalCreditEntity;
import com.example.ms_totalCost.models.CreditEntity;
import com.example.ms_totalCost.repositories.TotalCreditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Service
public class TotalCreditService {
    @Autowired
    TotalCreditRepository totalCreditRepository;

    private RestTemplate restTemplate = new RestTemplate();

    public int getCreditTotalCost(TotalCreditEntity totalCreditEntity, Long creditId){
        CreditEntity credit = restTemplate.getForObject("http://localhost:8080/credit/getById/" + creditId, CreditEntity.class);

        int requestedAmount = credit.getRequestedAmount();
        int maxTerm = credit.getMaxTerm();
        float interestRate = credit.getTotalCreditCost();
        float creditLifeInsurance = (float) (requestedAmount * 0.0003);
        int fireInsurance = 20000;
        float commission = (float) (requestedAmount * 0.001);


        double power = Math.pow(1 + interestRate, maxTerm);
        float monthlyPayment = (float) (requestedAmount * (interestRate * power) / (power - 1)) + creditLifeInsurance + fireInsurance;
        int totalCost = Math.round(monthlyPayment * maxTerm + commission);

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