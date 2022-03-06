package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.exceptions.UserAlreadyExistsException;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import mk.ukim.finki.problem_solving.model.object.User;
import mk.ukim.finki.problem_solving.model.exceptions.UserNotFoundException;
import mk.ukim.finki.problem_solving.repository.UserRepository;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    public User findByEmail(String email) {
        return this.userRepository.findById(email).orElseThrow(() -> new UserNotFoundException(email));
    }

    @Override
    public boolean register(UserInput userInput) {
        if (this.userRepository.findById(userInput.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException(userInput.getEmail());
        }
        userInput.setPassword(passwordEncoder.encode(userInput.getPassword()));
        this.userRepository.save(new User(userInput));
        return true;
    }
}
