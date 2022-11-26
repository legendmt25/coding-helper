package mk.ukim.finki.problem_solving.model.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.SubmissionStatus;
import mk.ukim.finki.problem_solving.model.object.Problem;

import java.util.Date;

@NoArgsConstructor
@Data
public class SubmissionDto {
  private Long id;
  private Date timeSubmitted;
  private SubmissionStatus status;
  private String language;
  private String code;

  private Problem problem;
}
