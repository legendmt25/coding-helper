package mk.ukim.finki.problem_solving.model.reqBody;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RunCodeReqBody {
  private Long problemId;
  private String fileName;
  private String language;
  private String code;
  private String input;
}
