package com.example.ms_status.controllers;

import com.example.ms_status.entities.StatusEntity;
import com.example.ms_status.services.StatusService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/status")
@CrossOrigin("*")
public class StatusController {

    @Autowired
    StatusService statusService;

    @PostMapping("/{creditId}")
    public ResponseEntity<StatusEntity> saveStatus(@RequestBody StatusEntity status, @PathVariable("creditId") Long creditId){
        StatusEntity newStatus = statusService.saveStatus(status,creditId);
        return ResponseEntity.ok(newStatus);
    }

    @GetMapping("/byCreditId/{creditId}")
    public ResponseEntity<Optional<StatusEntity>> getStatusByCreditId(@PathVariable("creditId") Long creditId){
        Optional<StatusEntity> status = statusService.getStatusByCreditId(creditId);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StatusEntity> getStatusById(@PathVariable Long id){
        StatusEntity status = statusService.getStatusById(id);
        return ResponseEntity.ok(status);
    }

    @GetMapping("/get")
    public ResponseEntity<Iterable<StatusEntity>> getAllStatus(){
        Iterable<StatusEntity> status = statusService.getAllStatus();
        return ResponseEntity.ok(status);
    }

    @PutMapping("/")
    public ResponseEntity<StatusEntity> updateStatus(@RequestBody StatusEntity status){
        StatusEntity updatedStatus = statusService.updateStatus(status);
        return  ResponseEntity.ok(updatedStatus);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<StatusEntity> deleteStatus(@PathVariable Long id) throws Exception {
        var isDeleted = statusService.deleteStatus(id);
        return ResponseEntity.noContent().build();
    }
}
