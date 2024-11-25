package com.example.ms_document;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class MsDocumentApplication {

	public static void main(String[] args) {
		SpringApplication.run(MsDocumentApplication.class, args);
	}

}
