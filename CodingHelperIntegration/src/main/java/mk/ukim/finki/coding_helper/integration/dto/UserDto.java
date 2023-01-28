package mk.ukim.finki.coding_helper.integration.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.coding_helper.integration.enums.Gender;
import mk.ukim.finki.coding_helper.integration.enums.Role;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
  private String username;
  private String firstName;
  private String lastName;
  private String avatarImage;
  private Gender gender;
  private Role role;
}
