package mk.ukim.finki.problem_solving.model.enums;

import org.springframework.security.core.GrantedAuthority;

public enum Role implements GrantedAuthority {
  USER,
  MODERATOR,
  ADMINISTRATOR;

  @Override
  public String getAuthority() {
    return name();
  }
}
