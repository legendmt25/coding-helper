package mk.ukim.finki.coding_helper.integration.model;

import lombok.Builder;
import lombok.Value;

@Value
@Builder
public class LoginModel {
  String email;
  String password;
}
