package mk.ukim.finki.coding_helper.application;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.neo4j.repository.config.EnableNeo4jRepositories;


@SpringBootApplication(scanBasePackages = {
    "mk.ukim.finki.coding_helper.integration",
    "mk.ukim.finki.coding_helper.core",
    "mk.ukim.finki.coding_helper.rest",
    "mk.ukim.finki.coding_helper.application"
})
@EnableNeo4jRepositories("mk.ukim.finki.coding_helper.integration.repository")
public class CodingHelperApplication {
  public static void main(String[] args) {
    SpringApplication.run(CodingHelperApplication.class, args);
  }
}