package com.example.ms_credit.clients;

import com.example.ms_credit.model.UserEntity;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;
@FeignClient(name = "ms-user", url = "http://localhost:8080/user")
public interface UserClient {
    @GetMapping("/getById/{id}")
    Optional<UserEntity> findUserById(@PathVariable("id") Long id);
}
