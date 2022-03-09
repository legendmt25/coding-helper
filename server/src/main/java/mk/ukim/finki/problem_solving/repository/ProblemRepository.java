package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.object.Category;
import mk.ukim.finki.problem_solving.model.object.Problem;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProblemRepository extends Neo4jRepository<Problem, Long> {
    List<Problem> findAllByCategory_NameIn(Collection<String> category_name);

    List<Problem> findTop10ByOrderByLikes();
}
