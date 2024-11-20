package com.example.ms_credit.controllers;

import com.example.ms_credit.dto.CreditDto;
import com.example.ms_credit.entities.CreditEntity;
import com.example.ms_credit.services.CreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/credit")
@CrossOrigin("*")
public class CreditController {
    @Autowired
    CreditService creditService;

    @GetMapping("/get")
    public ResponseEntity<List<CreditDto>> getAllCredit(){
        List<CreditDto> credits = creditService.getAllCredit();
        return ResponseEntity.ok(credits);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<List<CreditDto>> getAllCreditByUserId(@PathVariable("id") int id){
        List<CreditDto> credits = creditService.getAllCreditByUserId(id);
        return ResponseEntity.ok(credits);
    }

    @GetMapping("/getTotalCost/{creditId}")
    public int getCreditTotalCost(@PathVariable int creditId){
        return creditService.getCreditTotalCost(creditId);
    }

    @GetMapping("/getTotalMonthly/{creditId}")
    public int getCreditMonthlyCost(@PathVariable int creditId){
        CreditEntity credit = creditService.getCreditById(creditId);
        int monthlyCost = getCreditTotalCost(creditId)/credit.getMaxTerm();
        return monthlyCost;
    }

    @GetMapping("/getById/{creditId}")
    public ResponseEntity<CreditEntity> getCreditById(@PathVariable int creditId){
        CreditEntity credit = creditService.getCreditById(creditId);
        return ResponseEntity.ok(credit);
    }

    @PostMapping("/{userId}")
    public int saveCredit(@RequestBody CreditEntity credit, @PathVariable("userId") int userId){
        return creditService.saveCredit(credit,userId);
    }



    @PutMapping("/")
    public ResponseEntity<CreditEntity> updateCredit(@RequestBody CreditEntity credit){
        CreditEntity updatedCredit = creditService.updateCredit(credit);
        return  ResponseEntity.ok(updatedCredit);
    }

    @PutMapping("/status/{id}")
    public ResponseEntity<CreditEntity> updateStatus(@PathVariable int id, @RequestBody String status) {
        CreditEntity updatedCredit = creditService.updateStatus(id, status);
        return ResponseEntity.ok(updatedCredit);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CreditEntity> deleteCredit(@PathVariable int id) throws Exception {
        var isDeleted = creditService.deleteCredit(id);
        return ResponseEntity.noContent().build();
    }
}
