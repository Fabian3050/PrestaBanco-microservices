package com.example.ms_user.controllers;

import com.example.ms_user.entitities.UserEntity;
import com.example.ms_user.modules.Credit;
import com.example.ms_user.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/get")
    public ResponseEntity<List<UserEntity>> ListUsers(){
        List<UserEntity> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable("id") Long id){
        UserEntity user = userService.getUSerById(id);
        return ResponseEntity.ok(user);
    }

    @GetMapping("/getUSerCredits/{id}")
    public ResponseEntity<List<Credit>> getUserCredits(@PathVariable("id") Long id){
        List<Credit> credits = userService.getUserCredits(id);
        return ResponseEntity.ok(credits);
    }

    @PostMapping("/")
    public ResponseEntity<UserEntity> saveUser(@RequestBody UserEntity user){
        UserEntity newUser = userService.saveUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<UserEntity> updateUser(@RequestBody UserEntity user, @PathVariable("userId") Long userId){
        UserEntity updatedUser = userService.updateUser(user, userId);
        return  ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserEntity> deleteUser(@PathVariable("id") Long id) throws Exception {
        var isDeleted = userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getById/{id}")
    public Optional<UserEntity> findUserById(@PathVariable("id") Long id) {
        return userService.findUserById(id);
    }
}
