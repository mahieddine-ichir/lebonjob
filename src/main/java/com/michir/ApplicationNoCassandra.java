package com.michir;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ApplicationNoCassandra {

	public static void main(String[] args) throws InterruptedException {
		SpringApplication.run(ApplicationNoCassandra.class, args);
	}
}
