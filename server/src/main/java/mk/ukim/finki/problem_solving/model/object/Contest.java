package mk.ukim.finki.problem_solving.model.object;

import lombok.Data;
import lombok.NoArgsConstructor;
import mk.ukim.finki.problem_solving.model.converter.DurationConverter;
import mk.ukim.finki.problem_solving.model.enums.ContestStatus;
import org.springframework.data.neo4j.core.convert.ConvertWith;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Node
@Data
@NoArgsConstructor
public class Contest {
    @Id
    @GeneratedValue
    private Long id;
    private String name;
    private String duration;
    private Date startsOn;
    private ContestStatus status;

    @Relationship(value = "IN_CONTEST", direction = Relationship.Direction.INCOMING)
    List<ContestProblem> problems;

    public Contest(String name, Duration duration, ContestStatus status, Date startsOn) {
        this.name = name;
        this.duration = duration.toString();
        this.status = status;
        this.startsOn = startsOn;
        this.problems = new ArrayList<>();
    }
}
