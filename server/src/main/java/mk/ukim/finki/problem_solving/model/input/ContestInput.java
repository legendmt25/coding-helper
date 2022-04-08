package mk.ukim.finki.problem_solving.model.input;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.object.Duration;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ContestInput {
    private String name;
    private Duration duration;
    private Date startsOn;
}
