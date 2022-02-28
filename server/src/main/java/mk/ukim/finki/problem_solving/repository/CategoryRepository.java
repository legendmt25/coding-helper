package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.object.Category;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends Neo4jRepository<Category, String> {
}
