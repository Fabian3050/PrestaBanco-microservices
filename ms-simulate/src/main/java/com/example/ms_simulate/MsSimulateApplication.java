package com.example.ms_simulate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class MsSimulateApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsSimulateApplication.class, args);
	}

}
