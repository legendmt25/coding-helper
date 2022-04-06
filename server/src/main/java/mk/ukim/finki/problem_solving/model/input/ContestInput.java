package mk.ukim.finki.problem_solving.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContestInput {
    private String name;
    private String duration;
    private Date startsOn;
}
