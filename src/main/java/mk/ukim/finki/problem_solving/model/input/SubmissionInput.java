package mk.ukim.finki.problem_solving.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.SubmissionStatus;
import org.springframework.format.annotation.DateTimeFormat;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionInput {
    private String userId;
    private Long problemId;

    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE)
    private Date timeSubmitted;
    private SubmissionStatus status;
    private String language;
    private String code;

}
