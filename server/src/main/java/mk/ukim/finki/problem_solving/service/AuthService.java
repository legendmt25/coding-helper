package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.config.JwtRequest;
import mk.ukim.finki.problem_solving.model.object.User;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface AuthService extends UserDetailsService {
    @Override
    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;

}
