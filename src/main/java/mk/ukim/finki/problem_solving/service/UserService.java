package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.object.User;

import java.util.List;

public interface UserService {
    List<User> findAll();

    User findByEmail(String email);
}
