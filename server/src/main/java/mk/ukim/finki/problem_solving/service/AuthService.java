package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.object.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface AuthService extends UserDetailsService {
    @Override
    User loadUserByUsername(String email) throws UsernameNotFoundException;

}
