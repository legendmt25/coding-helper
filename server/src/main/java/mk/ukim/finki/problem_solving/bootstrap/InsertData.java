package mk.ukim.finki.problem_solving.bootstrap;

import mk.ukim.finki.problem_solving.service.AuthService;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;

@Component
public class InsertData {

  private final AuthService authService;

  public InsertData(AuthService authService) {
    this.authService = authService;
  }

  @PostConstruct
  public void setup() {
    //authService.register(new UserInput("user@codingh.com", "user", "user", "user", "user", Gender.MALE, new Date()));
  }

}
