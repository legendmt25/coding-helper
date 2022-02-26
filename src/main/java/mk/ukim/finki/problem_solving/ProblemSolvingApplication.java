package mk.ukim.finki.problem_solving;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class ProblemSolvingApplication {

    public static void main(String[] args) {
        SpringApplication.run(ProblemSolvingApplication.class, args);
    }

}
