package com.example.ms_totalCost;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class MsTotalCostApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsTotalCostApplication.class, args);
	}

}
