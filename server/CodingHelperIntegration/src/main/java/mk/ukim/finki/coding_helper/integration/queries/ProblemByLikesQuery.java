package mk.ukim.finki.coding_helper.integration.queries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.coding_helper.integration.model.Problem;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemByLikesQuery {
  private Problem problem;
  private Long likes;
}
