package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.object.Submission;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends Neo4jRepository<Submission, Long> {

    List<Submission> findAllByUser_Email(String Email);

    List<Submission> findAllByUser_EmailAndProblem_Id(String user_email, Long problem_id);

}
