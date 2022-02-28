package mk.ukim.finki.problem_solving.model;

import lombok.Data;
import lombok.RequiredArgsConstructor;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
@Data
@RequiredArgsConstructor
public class Category {
    @Id
    @GeneratedValue
    private Long Id;
    private String name;
}
