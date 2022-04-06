package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.dto.ProblemByLikesDto;
import mk.ukim.finki.problem_solving.model.object.Category;
import mk.ukim.finki.problem_solving.model.object.Problem;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;

@Repository
public interface ProblemRepository extends Neo4jRepository<Problem, Long> {
    @Override
    @Query("match (p:Problem) optional match (p)-[r:IN_CONTEST]->(c:Contest) with p, c where c is null or c.status='CLOSED' return p")
    List<Problem> findAll();

    List<Problem> findAllByCategory_NameIn(Collection<String> category_name);

    @Query("match (p:Problem) " +
            "optional match (p)-[r:IN_CONTEST]->(c:Contest) with p, c where c is null or c.status='CLOSED' " +
            "optional match (p)-[r:LIKED_BY]->(m:User) with p as problem, count(r) as likes return problem, likes")
    List<ProblemByLikesDto> findTop10ByOrderByLikes();
}
