package com.example.ms_status;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class MsStatusApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsStatusApplication.class, args);
	}

}
