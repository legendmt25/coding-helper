package mk.ukim.finki.problem_solving.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Difficulty;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node
@Data
@RequiredArgsConstructor
public class Problem {
    @Id
    @GeneratedValue
    private Long id;
    @Relationship
    private Category category;
    private String title;
    private Difficulty difficulty;

    private String markdown;
}
