package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.object.Submission;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubmissionRepository extends Neo4jRepository<Submission, Long> {

    List<SubmissionDto> findAllByUser_Email(String Email);

    List<SubmissionDto> findAllByUser_EmailAndProblem_Id(String user_email, Long problem_id);

    @Query(value = "MATCH (s:Submission)-[rel:PROBLEM]->(p:Problem) where ID(p) = $problemId detach delete s")
    void deleteAllByProblemId(Long problemId);

}
