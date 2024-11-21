package com.example.ms_credit.services;

import com.example.ms_credit.dto.CreditDto;
import com.example.ms_credit.dto.DocumentDto;
import com.example.ms_credit.entities.CreditEntity;
import com.example.ms_credit.entities.DocumentEntity;
import com.example.ms_credit.repositories.CreditRepository;
import com.example.ms_user.modules.Credit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.ms_credit.model.User;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CreditService {
    @Autowired
    CreditRepository creditRepository;
    @Autowired
    CreditService creditService;
    @Autowired
    DocumentService documentService;
    private final RestTemplate restTemplate = new RestTemplate();


    public Long saveCredit(CreditEntity credit, Long userId) {
        try {
            // Llama al servicio del usuario
            User user = restTemplate.getForObject("http://localhost:8080/user/get/" + userId, User.class);

            // Si el usuario no existe, lanza una excepción
            if (user == null) {
                throw new RuntimeException("User not found with ID: " + userId);
            }

            // Configura el crédito y lo asocia al usuario
            credit.setUserID(userId);

            // Persistencia en la base de datos
            creditRepository.save(credit);

            return credit.getId();
        } catch (Exception e) {
            throw new RuntimeException("An unexpected error occurred while saving credit", e);
        }
    }

    public List<CreditDto> getAllCredit(){
        List<CreditEntity> credits = creditRepository.findAll();
        return  credits.stream()
                .map(this::convertCreditToDTO)
                .collect(Collectors.toList());
    }

    public CreditEntity getCreditById(Long creditId) {
        return creditRepository.findById(creditId)
                .orElseThrow(() -> new NoSuchElementException("No credit found with ID: " + creditId));
    }

    public List<CreditDto> getAllCreditByUserId(Long userId) {
        User user = restTemplate.getForObject("http://localhost:8080/user/get/" + userId, User.class);
        List<CreditDto> credits = creditService.getAllCredit();
        for(CreditDto credit : credits){
            if(credit.getUserId() != userId){
                credits.remove(credit);
            }
        }
        return credits;
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
        creditDTO.setUserId(credit.getUserID());
        creditDTO.setCreditEvaluationId(credit.getCreditEvaluationID());

        List<DocumentDto> documentDTOS = new ArrayList<>();
        if (credit.getDocuments() != null) {
            documentDTOS = credit.getDocuments().stream()
                    .map(this::convertDocumentToDTO)
                    .collect(Collectors.toList());
        }
        creditDTO.setDocuments(documentDTOS);

        return creditDTO;
    }

    public DocumentDto convertDocumentToDTO(DocumentEntity document) {
        DocumentDto dto = new DocumentDto();
        dto.setId(document.getId());
        dto.setDocumentName(document.getDocumentName());
        dto.setDocumentType(document.getDocumentType());
        dto.setTypeCreditDocument(document.getTypeCreditDocument());
        return dto;
    }

    public CreditEntity updateStatus(Long id, String status) {
        CreditEntity credit = creditRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("No se encontró el crédito con ID: " + id));

        credit.setStatus(status);
        return creditRepository.save(credit);
    }
}
