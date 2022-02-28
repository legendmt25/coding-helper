package mk.ukim.finki.problem_solving.controller;

import mk.ukim.finki.problem_solving.model.User;
import mk.ukim.finki.problem_solving.model.UserInput;
import mk.ukim.finki.problem_solving.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestBody UserInput userInput) {
        return ResponseEntity.ok(this.authService.register(userInput));
    }
}
