package mk.ukim.finki.coding_helper.core.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.coding_helper.core.service.AuthService;
import mk.ukim.finki.coding_helper.integration.model.User;
import mk.ukim.finki.coding_helper.integration.repository.UserRepository;
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
