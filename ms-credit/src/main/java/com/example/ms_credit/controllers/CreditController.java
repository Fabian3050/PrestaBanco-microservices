package com.example.ms_credit.controllers;

import com.example.ms_credit.dto.CreditDto;
import com.example.ms_credit.entities.CreditEntity;
import com.example.ms_credit.model.DocumentEntity;
import com.example.ms_credit.services.CreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/credit")
public class CreditController {
    @Autowired
    CreditService creditService;

    @GetMapping("/get")
    public ResponseEntity<List<CreditDto>> getAllCredit(){
        List<CreditDto> credits = creditService.getAllCredit();
        return ResponseEntity.ok(credits);
    }

    @GetMapping("/getAllCreditUserId/{id}")
    public ResponseEntity<List<CreditDto>> getAllCreditByUserId(@PathVariable("id") Long id){
        List<CreditDto> credits = creditService.getAllCreditByUserId(id);
        return ResponseEntity.ok(credits);
    }

    @GetMapping("/getTotalCost/{creditId}")
    public int getCreditTotalCost(@PathVariable("creditId") Long creditId){
        return creditService.getCreditTotalCost(creditId);
    }

    @GetMapping("/getTotalMonthly/{creditId}")
    public int getCreditMonthlyCost(@PathVariable("creditId") Long creditId){
        Optional<CreditDto> credit = creditService.getCreditById(creditId);
        int monthlyCost = getCreditTotalCost(creditId)/credit.get().getMaxTerm();
        return monthlyCost;
    }

    @GetMapping("/getById/{creditId}")
    public Optional<CreditDto> getCreditById(@PathVariable("creditId") Long creditId){
        return creditService.getCreditById(creditId);
    }

    @GetMapping("/getDocumentsByCreditId/{creditId}")
    public List<DocumentEntity> getDocumentsByCreditId(@PathVariable("creditId") Long creditId){
        return creditService.getDocumentByCreditId(creditId);
    }

    @PostMapping("/{userId}")
    public Long saveCredit(@RequestBody CreditEntity credit, @PathVariable("userId") Long userId){
        return creditService.saveCredit(credit,userId);
    }



    @PutMapping("/")
    public ResponseEntity<CreditEntity> updateCredit(@RequestBody CreditEntity credit){
        CreditEntity updatedCredit = creditService.updateCredit(credit);
        return  ResponseEntity.ok(updatedCredit);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<CreditEntity> updateStatus(@PathVariable("id") Long id, @RequestBody String status) {
        CreditEntity updatedCredit = creditService.updateStatus(id, status);
        return ResponseEntity.ok(updatedCredit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CreditEntity> deleteCredit(@PathVariable("id") Long id) throws Exception {
        var isDeleted = creditService.deleteCredit(id);
        return ResponseEntity.noContent().build();
    }
}
