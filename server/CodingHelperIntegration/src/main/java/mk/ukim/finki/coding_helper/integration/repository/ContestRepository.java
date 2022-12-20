package mk.ukim.finki.coding_helper.integration.repository;

import mk.ukim.finki.coding_helper.integration.model.Contest;
import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface ContestRepository extends Neo4jRepository<Contest, Long> {
}
