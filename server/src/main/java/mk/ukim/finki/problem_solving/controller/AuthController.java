package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.config.JwtRequest;
import mk.ukim.finki.problem_solving.config.JwtResponse;
import mk.ukim.finki.problem_solving.config.JwtTokenUtil;
import mk.ukim.finki.problem_solving.model.exceptions.InvalidCredentialsException;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import mk.ukim.finki.problem_solving.service.AuthService;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class AuthController {
    private final AuthenticationManager authenticationManager;
    private final JwtTokenUtil jwtTokenUtil;
    private final AuthService authService;
    private final UserService userService;


    @PostMapping("/register")
    public boolean registerUser(@RequestBody UserInput userInput) {
        return this.userService.register(userInput);
    }

    @PostMapping("/authenticate")
    public JwtResponse authenticate(@RequestBody JwtRequest authRequest) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword()));
        } catch (DisabledException | BadCredentialsException e) {
            throw new InvalidCredentialsException();
        }
        final var userDetails = authService.loadUserByUsername(authRequest.getEmail());
        return new JwtResponse(jwtTokenUtil.generateToken(userDetails));
    }
}
