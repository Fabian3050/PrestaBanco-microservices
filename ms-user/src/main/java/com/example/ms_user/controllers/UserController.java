package com.example.ms_user.controllers;

import com.example.ms_user.entitities.UserEntity;
import com.example.ms_user.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping("/get")
    public ResponseEntity<List<UserEntity>> ListUsers(){
        List<UserEntity> users = userService.getUsers();
        return ResponseEntity.ok(users);
    }

    @GetMapping("/get/{id}")
    public ResponseEntity<UserEntity> getUserById(@PathVariable int id){
        UserEntity user = userService.getUSerById(id);
        return ResponseEntity.ok(user);
    }

    @PostMapping("/")
    public ResponseEntity<UserEntity> saveUser(@RequestBody UserEntity user){
        UserEntity newUser = userService.saveUser(user);
        return ResponseEntity.ok(newUser);
    }

    @PutMapping("/")
    public ResponseEntity<UserEntity> updateUser(@RequestBody UserEntity user){
        UserEntity updatedUser = userService.updateUser(user);
        return  ResponseEntity.ok(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<UserEntity> deleteUser(@PathVariable int id) throws Exception {
        var isDeleted = userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
