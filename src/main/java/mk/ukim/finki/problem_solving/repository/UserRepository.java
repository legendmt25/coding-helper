package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.User;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends Neo4jRepository<User, String> {
}
