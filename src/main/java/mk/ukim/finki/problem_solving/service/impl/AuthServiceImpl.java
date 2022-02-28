package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.exceptions.UserAlreadyExistsException;
import mk.ukim.finki.problem_solving.model.object.User;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import mk.ukim.finki.problem_solving.repository.UserRepository;
import mk.ukim.finki.problem_solving.service.AuthService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        return userRepository.findById(email).orElseThrow(() -> new UsernameNotFoundException(email));
    }

    @Override
    public User register(UserInput userInput) {
        if (userRepository.findById(userInput.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException(userInput.getEmail());
        }
        userInput.setPassword(passwordEncoder.encode(userInput.getPassword()));
        return userRepository.save(new User(userInput));
    }
}
