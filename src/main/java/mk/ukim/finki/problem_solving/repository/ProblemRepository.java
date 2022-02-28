package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.object.Problem;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProblemRepository extends Neo4jRepository<Problem, Long> {
}
