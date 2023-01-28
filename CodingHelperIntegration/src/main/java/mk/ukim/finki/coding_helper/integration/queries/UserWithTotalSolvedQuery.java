package mk.ukim.finki.coding_helper.integration.queries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.coding_helper.integration.model.User;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserWithTotalSolvedQuery {
  private User user;
  private Long solved;
}
