package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.User;
import mk.ukim.finki.problem_solving.model.UserInput;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface AuthService extends UserDetailsService {
    @Override
    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;

    User register(UserInput userInput);
}
