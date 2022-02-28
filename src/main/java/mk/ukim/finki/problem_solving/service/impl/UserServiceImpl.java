package mk.ukim.finki.problem_solving.service.impl;

import mk.ukim.finki.problem_solving.model.User;
import mk.ukim.finki.problem_solving.model.exceptions.UserNotFoundException;
import mk.ukim.finki.problem_solving.repository.UserRepository;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User findByEmail(String email) {
        return userRepository.findById(email).orElseThrow(() -> new UserNotFoundException(email));
    }
}
