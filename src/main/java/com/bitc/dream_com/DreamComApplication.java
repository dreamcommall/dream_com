package com.bitc.dream_com;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class DreamComApplication {

	public static void main(String[] args) {
		SpringApplication.run(DreamComApplication.class, args);
	}

}
