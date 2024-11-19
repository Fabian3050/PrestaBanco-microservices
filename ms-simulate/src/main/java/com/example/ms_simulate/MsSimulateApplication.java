package com.example.ms_simulate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class MsSimulateApplication {
	public static void main(String[] args) {
		SpringApplication.run(MsSimulateApplication.class, args);
	}

}
