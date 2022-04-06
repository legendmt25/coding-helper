package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.object.Contest;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ContestRepository extends Neo4jRepository<Contest, Long> {
}
