package com.example.ms_credit.services;

import com.example.ms_credit.clients.UserClient;
import com.example.ms_credit.dto.CreditDto;
import com.example.ms_credit.entities.CreditEntity;
import com.example.ms_credit.model.DocumentEntity;
import com.example.ms_credit.repositories.CreditRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ms_credit.model.UserEntity;
import org.springframework.web.client.RestTemplate;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class CreditService {
    @Autowired
    CreditRepository creditRepository;
    @Autowired
    CreditService creditService;
    private UserClient userClient;
    private RestTemplate restTemplate = new RestTemplate();

    @Autowired
    public CreditService(UserClient userClient) {
        this.userClient = userClient;
    }

    public Long saveCredit(CreditEntity credit, Long userId) {
        UserEntity user = restTemplate.getForObject("http://gateway-service/ms-user/user/getById/" + userId, UserEntity.class);

        // Verifica si el usuario es nulo
        if (user != null) {
            Date date = new Date();
            credit.setApplicationDate(date);
            credit.setUserId(user.getId());
            creditRepository.save(credit);
            return credit.getId();
        }
        return null;
    }

    public List<CreditDto> getAllCredit(){
        List<CreditEntity> credits = creditRepository.findAll();
        return  credits.stream()
                .map(this::convertCreditToDTO)
                .collect(Collectors.toList());
    }

    public Optional<CreditDto> getCreditById(Long creditId) {
        Optional<CreditEntity> credit = creditRepository.findById(creditId);
        if (credit.isPresent()) {
            Optional<CreditDto> creditDTO = Optional.of(this.convertCreditToDTO(credit.get()));
            System.out.println(creditDTO.toString());
            return creditDTO;
        }
        return Optional.empty();
    }

    public List<CreditDto> getAllCreditByUserId(Long userId) {
        Optional<List<CreditEntity>> creditList = creditRepository.findAllByUserId(userId);

        if (creditList.isPresent()) {
            return creditList.get().stream()
                    .map(this::convertCreditToDTO)
                    .collect(Collectors.toList());
        }
        return Collections.emptyList();
    }

    public int getCreditTotalCost(Long creditId){
        Optional<CreditEntity> credit = creditRepository.findById(creditId);
        int requestedAmount = credit.get().getRequestedAmount();
        int maxTerm = credit.get().getMaxTerm();
        float interestRate = credit.get().getTotalCreditCost();
        float creditLifeInsurance = (float) (requestedAmount * 0.0003);
        int fireInsurance = 20000;
        float commission = (float) (requestedAmount * 0.001);


        double power = Math.pow(1 + interestRate, maxTerm);
        float monthlyPayment = (float) (requestedAmount * (interestRate * power) / (power - 1)) + creditLifeInsurance + fireInsurance;
        int totalCost = Math.round(monthlyPayment * maxTerm + commission);

        return totalCost;
    }

    public CreditEntity updateCredit(CreditEntity credit){
        return creditRepository.save(credit);
    }

    public boolean deleteCredit(Long id) throws Exception{
        try{
            creditRepository.deleteById(id);
            return true;
        } catch (Exception e){
            throw new Exception(e.getMessage());
        }
    }

    public CreditDto convertCreditToDTO(CreditEntity credit){
        CreditDto creditDTO = new CreditDto();
        creditDTO.setId(credit.getId());
        creditDTO.setCreditType(credit.getCreditType());
        creditDTO.setMaxTerm(credit.getMaxTerm());
        creditDTO.setInterestRate(credit.getInterestRate());
        creditDTO.setRequestedAmount(credit.getRequestedAmount());
        creditDTO.setApprovedAmount(credit.getApprovedAmount());
        creditDTO.setStatus(credit.getStatus());
        creditDTO.setApplicationDate(credit.getApplicationDate());
        creditDTO.setApprovedRejectionDate(credit.getApprovedRejectionDate());
        creditDTO.setUserId(credit.getUserId());
        creditDTO.setCreditEvaluationId(credit.getCreditEvaluationId());
        return creditDTO;
    }

    public CreditEntity updateStatus(Long id, String status) {
        CreditEntity credit = creditRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No se encontró el crédito con ID: " + id));

        credit.setStatus(status);
        return creditRepository.save(credit);
    }

    public List<DocumentEntity> getDocumentByCreditId(Long creditId) {
        Optional<List<CreditEntity>> credits = creditRepository.findAllById(creditId);
        if (credits.isPresent()) {
            DocumentEntity documents = restTemplate.getForObject("http://ms-document/document/getByCreditId/" + creditId, DocumentEntity.class);
            return (List<DocumentEntity>) documents;
        }
        return null;
    }
}
