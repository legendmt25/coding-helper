package mk.ukim.finki.coding_helper.integration.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.coding_helper.integration.enums.SubmissionStatus;
import mk.ukim.finki.coding_helper.integration.model.Problem;

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
