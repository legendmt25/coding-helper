package mk.ukim.finki.coding_helper.core.service;

import mk.ukim.finki.coding_helper.integration.model.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

public interface AuthService extends UserDetailsService {
  @Override
  User loadUserByUsername(String email) throws UsernameNotFoundException;

}
