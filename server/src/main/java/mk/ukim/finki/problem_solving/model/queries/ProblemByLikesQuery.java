package mk.ukim.finki.problem_solving.model.queries;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.object.Problem;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemByLikesQuery {
    private Problem problem;
    private Long likes;
}
