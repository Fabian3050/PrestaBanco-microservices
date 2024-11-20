package com.example.ms_creditEvaluation.services;

import com.example.ms_creditEvaluation.entities.CreditEvaluationEntity;
import com.example.ms_creditEvaluation.modules.Credit;
import com.example.ms_creditEvaluation.repositories.CreditEvaluationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;

@Service
public class CreditEvaluationService {
    @Autowired
    CreditEvaluationRepository creditEvaluationRepository;

    public CreditEvaluationEntity saveCreditEvaluation(CreditEvaluationEntity creditEvaluation , int creditId){
        RestTemplate restTemplate = new RestTemplate();
        Credit credit = restTemplate.getForObject("http://ms-credit/credit/getById/" + creditId, Credit.class);
        credit.setCreditEvaluationID(creditEvaluation.getId());
        creditEvaluation.setCreditId(creditId);
        return creditEvaluationRepository.save(creditEvaluation);
    }

    public ArrayList<CreditEvaluationEntity> getAllCreditEvaluation(){ return (ArrayList<CreditEvaluationEntity>) creditEvaluationRepository.findAll();}

    public CreditEvaluationEntity getCreditEvaluationById(int id){
        return creditEvaluationRepository.findById(id).get();
    }

    public CreditEvaluationEntity getCreditEvaluationByCreditId(int creditId){
        RestTemplate restTemplate = new RestTemplate();
        Credit credit = restTemplate.getForObject("http://ms-credit/credit/getById/" + creditId, Credit.class);
        int creditEvaluationId = credit.getCreditEvaluationID();
        CreditEvaluationEntity creditEvaluation = creditEvaluationRepository.findById(creditEvaluationId).get();
        return creditEvaluation;
    }

    public CreditEvaluationEntity updateCreditEvaluation(CreditEvaluationEntity creditEvaluation){
        return creditEvaluationRepository.save(creditEvaluation);
    }

    public boolean deleteCreditEvaluation(int id) throws Exception{
        try{
            creditEvaluationRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }
}
