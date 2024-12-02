package com.example.ms_totalCost.controllers;

import com.example.ms_totalCost.entities.TotalCreditEntity;
import com.example.ms_totalCost.services.TotalCreditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/totalCost")
public class TotalCreditControllers {
    @Autowired
    TotalCreditService totalCreditService;

    @PostMapping("/{creditId}")
    public ResponseEntity<TotalCreditEntity> saveTotalCredit(@RequestBody TotalCreditEntity totalCredit, @PathVariable("creditId") Long creditId){
        TotalCreditEntity newTotalCredit = totalCreditService.saveTotalCredit(totalCredit,creditId);
        return ResponseEntity.ok(newTotalCredit);
    }

    @GetMapping("/getById/{id}")
    public TotalCreditEntity getTotalCredit(@PathVariable("id") Long id){
        return totalCreditService.getTotalCreditById(id);
    }

    @DeleteMapping("/{creditId}")
    public ResponseEntity<TotalCreditEntity> deleteTotalCredit(@PathVariable("creditId") Long creditId) throws Exception {
        var isDeleted = totalCreditService.deleteTotalCredit(creditId);
        return ResponseEntity.noContent().build();
    }
}
