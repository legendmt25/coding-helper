package mk.ukim.finki.problem_solving.model.object;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Difficulty;
import org.springframework.data.neo4j.core.schema.GeneratedValue;
import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

@Node
@Data
@NoArgsConstructor
public class Problem {
    @Id
    @GeneratedValue
    private Long id;
    @Relationship
    private Category category;
    private String title;
    private Difficulty difficulty;
    private String markdown;
    private String starterCode;

    private Long likes;

    public Problem(Category category, String title, Difficulty difficulty, String markdown, String starterCode) {
        this.category = category;
        this.title = title;
        this.difficulty = difficulty;
        this.markdown = markdown;
        this.starterCode = starterCode;
        this.likes = 0L;
    }
}
