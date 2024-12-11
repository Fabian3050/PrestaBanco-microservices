package com.example.ms_user.services;

import com.example.ms_user.entitities.UserEntity;
import com.example.ms_user.modules.Credit;
import com.example.ms_user.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestOperations;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    UserRepository userRepository;

    public ArrayList<UserEntity> getUsers() {return (ArrayList<UserEntity>) userRepository.findAll();}

    public UserEntity getUSerById(Long id){return userRepository.findById(id).get();}

    public UserEntity saveUser(UserEntity user){
        return userRepository.save(user);
    }

    public UserEntity updateUser(UserEntity user){
        return userRepository.save(user);
    }

    public boolean deleteUser(Long id) throws Exception {
        try{
            userRepository.deleteById(id);
            return true;
        } catch (Exception e) {
            throw new Exception(e.getMessage());
        }
    }

    public List<Credit> getUserCredits(Long userId) {
        RestOperations restTemplate = new RestTemplate();
        List<Credit> credits = restTemplate.getForObject("http://127.0.0.1:8080/credit/getAllCreditUserId/" + userId, List.class);
        return credits;
    }

    public Optional<UserEntity> findUserById(Long id){
        return  userRepository.findById(id);
    }
}
