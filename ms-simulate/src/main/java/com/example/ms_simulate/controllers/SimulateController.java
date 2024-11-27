package com.example.ms_simulate.controllers;

import com.example.ms_simulate.entities.SimulateEntity;
import com.example.ms_simulate.services.SimulateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/simulate")
public class SimulateController {
    @Autowired
    SimulateService simulateService;

    @PostMapping("/")
    public ResponseEntity<SimulateEntity> saveSimulate(@RequestBody SimulateEntity simulate){
        SimulateEntity simul = simulateService.saveSimulate(simulate);
        return ResponseEntity.ok(simul);
    }

    @GetMapping("/getM/{id}")
    public ResponseEntity<SimulateEntity> getSimulateCredit(@PathVariable Long id){
        SimulateEntity simulate = simulateService.getSimulateCredit(id);
        return ResponseEntity.ok(simulate);
    }

    @GetMapping("/{id}")
    public ResponseEntity<SimulateEntity> getSimulateById(@PathVariable Long id){
        SimulateEntity simulate = simulateService.getSimulateById(id);
        return ResponseEntity.ok(simulate);
    }

    @GetMapping("/totalPay/simulateId")
    public ResponseEntity<SimulateEntity> calculateMonthlyPaymentAllCost(@PathVariable Long simulateId){
        SimulateEntity simulate = simulateService.calculateMonthlyPaymentAllCost(simulateId);
        return ResponseEntity.ok(simulate);
    }

    @GetMapping("/all")
    public ArrayList<SimulateEntity> getAllSimulate(){
        return simulateService.getAllSimulate();
    }
}
