package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.config.JwtRequest;
import mk.ukim.finki.problem_solving.config.JwtTokenUtil;
import mk.ukim.finki.problem_solving.model.exceptions.InvalidCredentialsException;
import mk.ukim.finki.problem_solving.model.exceptions.UserAlreadyExistsException;
import mk.ukim.finki.problem_solving.model.object.User;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import mk.ukim.finki.problem_solving.repository.UserRepository;
import mk.ukim.finki.problem_solving.service.AuthService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findById(email).orElseThrow(() -> new UsernameNotFoundException(email));
    }
}
