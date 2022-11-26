package mk.ukim.finki.problem_solving.model.queries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.object.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithTotalSolvedQuery {
  private User user;
  private Long solved;
}
