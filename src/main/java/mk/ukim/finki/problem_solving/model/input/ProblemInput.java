package mk.ukim.finki.problem_solving.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Difficulty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemInput {
    private String categoryName;
    private String title;
    private Difficulty difficulty;
    private String markdown;
}
