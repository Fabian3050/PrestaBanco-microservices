package com.example.ms_creditEvaluation.services;

import com.example.ms_creditEvaluation.entities.CreditEvaluationEntity;
import com.example.ms_creditEvaluation.modules.CreditEntity;
import com.example.ms_creditEvaluation.repositories.CreditEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

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
        RestTemplate restTemplate = new RestTemplate();
        CreditEntity credit = restTemplate.getForObject("http://localhost:8080/credit/getById/" + creditId, CreditEntity.class);
        Long creditEvaluationId = credit.getCreditEvaluationId();
        CreditEvaluationEntity creditEvaluation = creditEvaluationRepository.findById(creditEvaluationId).get();
        return creditEvaluation;
    }

    public CreditEvaluationEntity updateCreditEvaluation(CreditEvaluationEntity creditEvaluation){
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
