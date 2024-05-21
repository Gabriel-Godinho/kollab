package com.api.kollab;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

@SpringBootApplication
@EnableMongoRepositories
public class KollabApplication {

	public static void main(String[] args) {
		SpringApplication.run(KollabApplication.class, args);
	}

}
