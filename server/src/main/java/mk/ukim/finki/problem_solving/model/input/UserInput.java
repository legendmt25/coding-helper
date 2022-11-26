package mk.ukim.finki.problem_solving.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Gender;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserInput {
  private String email;
  private String username;
  private String password;
  private String firstName;
  private String lastName;
  private Gender gender;
  @DateTimeFormat(pattern = "yyyy-MM-dd")
  private Date birthday;

}
