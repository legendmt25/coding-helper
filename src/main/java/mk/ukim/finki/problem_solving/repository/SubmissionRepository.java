package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.Submission;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SubmissionRepository extends Neo4jRepository<Submission, Long> {

}
