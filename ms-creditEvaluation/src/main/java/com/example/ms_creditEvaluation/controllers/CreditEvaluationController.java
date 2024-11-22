package com.example.ms_creditEvaluation.controllers;

import com.example.ms_creditEvaluation.entities.CreditEvaluationEntity;
import com.example.ms_creditEvaluation.services.CreditEvaluationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/creditEvaluation")
@CrossOrigin("*")
public class CreditEvaluationController {
    @Autowired
    CreditEvaluationService creditEvaluationService;

    @GetMapping("/get")
    public ResponseEntity<List<CreditEvaluationEntity>> ListEvaluation(){
        List<CreditEvaluationEntity> creditEvaluations = creditEvaluationService.getAllCreditEvaluation();
        return ResponseEntity.ok(creditEvaluations);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<CreditEvaluationEntity> getCreditEvaluation(@PathVariable("id") Long id){
        CreditEvaluationEntity creditEvaluation = creditEvaluationService.getCreditEvaluationById(id);
        return ResponseEntity.ok(creditEvaluation);
    }

    @GetMapping("/getCreditId/{creditId}")
    public CreditEvaluationEntity getCreditEvaluationByCreditId(@PathVariable("id") Long creditId){
        return creditEvaluationService.getCreditEvaluationByCreditId(creditId);
    }

    @PostMapping("/{creditId}")
    public ResponseEntity<CreditEvaluationEntity> saveCreditEvaluation(@RequestBody CreditEvaluationEntity creditEvaluation, @PathVariable("id") Long creditId){
        CreditEvaluationEntity newCreditEvaluation = creditEvaluationService.saveCreditEvaluation(creditEvaluation,creditId);
        return ResponseEntity.ok(newCreditEvaluation);
    }

    @PutMapping("/")
    public ResponseEntity<CreditEvaluationEntity> updateCreditEvaluation(@RequestBody CreditEvaluationEntity creditEvaluation){
        CreditEvaluationEntity updatedCreditEvaluation = creditEvaluationService.updateCreditEvaluation(creditEvaluation);
        return  ResponseEntity.ok(updatedCreditEvaluation);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<CreditEvaluationEntity> deleteUser(@PathVariable("id") Long id) throws Exception {
        var isDeleted = creditEvaluationService.deleteCreditEvaluation(id);
        return ResponseEntity.noContent().build();
    }
}
