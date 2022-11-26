package mk.ukim.finki.problem_solving.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.object.Category;
import mk.ukim.finki.problem_solving.model.enums.Difficulty;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProblemInput {
  private Category category;
  private String title;
  private Difficulty difficulty;
  private String markdown;
  private MultipartFile starterCode;
  private MultipartFile runnerCode;
  private MultipartFile[] testCases;
}
