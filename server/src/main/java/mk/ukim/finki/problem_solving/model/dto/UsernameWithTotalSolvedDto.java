package mk.ukim.finki.problem_solving.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsernameWithTotalSolvedDto {
  private String username;
  private Long solved;
}
