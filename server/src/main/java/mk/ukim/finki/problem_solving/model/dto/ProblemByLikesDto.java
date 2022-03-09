package mk.ukim.finki.problem_solving.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Difficulty;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemByLikesDto {
    private Long id;
    private String title;
    private Difficulty difficulty;
    private String markdown;
    private String starterCode;
    private Long likes;
}
