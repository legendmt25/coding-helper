package mk.ukim.finki.problem_solving.model.reqBody;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SubmissionsFilterReqBody {
    private String userEmail;
    private Long problemId;
}
