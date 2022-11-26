package mk.ukim.finki.problem_solving.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Gender;
import mk.ukim.finki.problem_solving.model.enums.Role;

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
