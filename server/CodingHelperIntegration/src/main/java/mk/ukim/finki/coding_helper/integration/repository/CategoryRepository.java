package mk.ukim.finki.coding_helper.integration.repository;

import mk.ukim.finki.coding_helper.integration.model.Category;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends Neo4jRepository<Category, String> {
}
