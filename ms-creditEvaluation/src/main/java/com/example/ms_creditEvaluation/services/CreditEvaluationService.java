package com.example.ms_creditEvaluation.services;

import com.example.ms_creditEvaluation.entities.CreditEvaluationEntity;
import com.example.ms_creditEvaluation.modules.CreditEntity;
import com.example.ms_creditEvaluation.repositories.CreditEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;

@Service
public class CreditEvaluationService {
    @Autowired
    CreditEvaluationRepository creditEvaluationRepository;

    public CreditEvaluationEntity saveCreditEvaluation(CreditEvaluationEntity creditEvaluation , Long creditId){
        RestTemplate restTemplate = new RestTemplate();
        CreditEntity credit = restTemplate.getForObject("http://localhost:8080/credit/getById/" + creditId, CreditEntity.class);
        credit.setCreditEvaluationId(creditEvaluation.getId());
        creditEvaluation.setCreditId(creditId);
        return creditEvaluationRepository.save(creditEvaluation);
    }

    public ArrayList<CreditEvaluationEntity> getAllCreditEvaluation(){ return (ArrayList<CreditEvaluationEntity>) creditEvaluationRepository.findAll();}

    public CreditEvaluationEntity getCreditEvaluationById(Long id){
        return creditEvaluationRepository.findById(id).get();
    }

    public CreditEvaluationEntity getCreditEvaluationByCreditId(Long creditId){
        List<CreditEvaluationEntity> creditEvaluations = creditEvaluationRepository.findAll();
        for(CreditEvaluationEntity creditEvaluation : creditEvaluations){
            if(creditEvaluation.getCreditId().equals(creditId)){
                return creditEvaluation;
            }
        }
        return null;
    }

    public CreditEvaluationEntity updateCreditEvaluation(CreditEvaluationEntity creditEvaluation, Long creditId){
        RestTemplate restTemplate = new RestTemplate();
        CreditEntity credit = restTemplate.getForObject("http://localhost:8080/credit/getById/" + creditId, CreditEntity.class);
        credit.setCreditEvaluationId(creditEvaluation.getId());
        creditEvaluation.setCreditId(creditId);
        creditEvaluation.setRatioFeeIncome(creditEvaluation.getRatioFeeIncome());
        creditEvaluation.setCreditHistory(creditEvaluation.getCreditHistory());
        creditEvaluation.setJobSeniority(creditEvaluation.getJobSeniority());
        creditEvaluation.setRatioDebtIncome(creditEvaluation.getRatioDebtIncome());
        creditEvaluation.setMaximumFinancingAmount(creditEvaluation.getMaximumFinancingAmount());
        creditEvaluation.setApplicantAge(creditEvaluation.getApplicantAge());
        creditEvaluation.setSavingCapacity(creditEvaluation.getSavingCapacity());
        return creditEvaluationRepository.save(creditEvaluation);
    }

    public boolean deleteCreditEvaluation(Long id) throws Exception{
        try{
            creditEvaluationRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
