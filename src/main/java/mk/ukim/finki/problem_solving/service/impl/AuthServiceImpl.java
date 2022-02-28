package mk.ukim.finki.problem_solving.service.impl;

import mk.ukim.finki.problem_solving.model.User;
import mk.ukim.finki.problem_solving.model.UserInput;
import mk.ukim.finki.problem_solving.repository.UserRepository;
import mk.ukim.finki.problem_solving.service.AuthService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findById(email).orElseThrow(() -> new UsernameNotFoundException(email));
    }

    @Override
    public User register(UserInput userInput) {
        userInput.setPassword(passwordEncoder.encode(userInput.getPassword()));
        return userRepository.save(new User(userInput));
    }
}
