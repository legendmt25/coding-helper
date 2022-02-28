package mk.ukim.finki.problem_solving.serviceTests;

import mk.ukim.finki.problem_solving.model.object.User;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import mk.ukim.finki.problem_solving.model.enums.Gender;
import mk.ukim.finki.problem_solving.service.AuthService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.mock.mockito.SpyBean;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.Date;

@RunWith(SpringRunner.class)
public class UserServiceTest {

    @SpyBean
    private AuthService authService;

    private User user;

    @BeforeEach
    public void setUp() {
        user = new User(new UserInput(
                "user@coding.com",
                "user",
                "user",
                "user",
                "user",
                Gender.MALE,
                new Date())
        );
    }

    @Test
    public void registerUserTest() {
        authService.register(new UserInput(
                "user@coding.com",
                "user",
                "user",
                "user",
                "user",
                Gender.MALE,
                new Date())
        );
    }
}
