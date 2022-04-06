package mk.ukim.finki.problem_solving.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Difficulty;
import mk.ukim.finki.problem_solving.model.object.Problem;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemByLikesDto {
    private Problem problem;
    private Long likes;
}
