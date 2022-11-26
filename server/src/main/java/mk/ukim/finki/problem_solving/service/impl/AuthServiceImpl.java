package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.object.User;
import mk.ukim.finki.problem_solving.repository.UserRepository;
import mk.ukim.finki.problem_solving.service.AuthService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
  private final UserRepository userRepository;


  @Override
  public User loadUserByUsername(String email) throws UsernameNotFoundException {
    return userRepository.findById(email).orElseThrow(() -> new UsernameNotFoundException(email));
  }
}
