//package com.michir;
//
//import javax.annotation.PreDestroy;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.ConfigurableApplicationContext;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//import com.datastax.driver.core.Cluster;
//import com.datastax.driver.core.ResultSet;
//import com.datastax.driver.core.Session;
//
//@SpringBootApplication
//@Configuration
//public class Application {
//
//	@Value("${cassandra.host:127.0.0.1}")
//	private String cassandraHost;
//	
//	Cluster cluster;
//
//	public static void main(String[] args) throws InterruptedException {
//		ConfigurableApplicationContext applicationContext = SpringApplication.run(Application.class, args);
//		
//		Session session = applicationContext.getBean(Session.class);
//		System.out.println("Inserting data ...");
//		
//		session.execute("CREATE KEYSPACE IF NOT EXISTS tests WITH replication = {'class': 'SimpleStrategy', 'replication_factor': '3'};");
//		session.execute("CREATE TABLE IF NOT EXISTS tests.any (id uuid PRIMARY KEY, name TEXT);");
//
//		session.execute("INSERT INTO tests.any (id, name) values (uuid(), '"+"mic"+"')");
////			QueryBuilder
////				.insertInto("tests", "any")
////				.value("id", ""+uuid)
////				.value("name", "mahieddine.ichir")
////				);
//		//forEach(r -> System.out.println("> inserted "+r));
//		
//		System.out.println("Reading data ...");
//		ResultSet resultSet = session.execute("SELECT * from tests.any");
//		resultSet.all().forEach(r -> {
//			System.out.println("uuid: "+r.getUUID("id")+", name: "+r.getString("name"));
//		});
//		
//		applicationContext.close();
//	}
//
//	@Bean
//	Cluster cluster() {
//		this.cluster = Cluster.builder()
//				//.withClusterName("myCluster")
//				.addContactPoint(cassandraHost)
//				.build();
//		Runtime.getRuntime().addShutdownHook(new Thread() {
//			@Override
//			public void run() {
//				Application.this.close();
//			}
//		});
//		return this.cluster;
//	}
//
//	@Bean
//	Session session(@Autowired Cluster cluster) {
//		return cluster.connect();
//	}
//
//	@PreDestroy
//	public void close() {
//		System.out.println("Closing cluster connection ...");
//		cluster.close();
//	}
//}
