package mk.ukim.finki.problem_solving.repository;

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
    @Query("MATCH (n:Problem) WHERE n.visible=true RETURN n")
    List<Problem> findAll();

    List<Problem> findAllByCategory_NameIn(Collection<String> category_name);

    @Query("MATCH (n:Problem) OPTIONAL MATCH (n)-[relation:LIKED_BY]->(m:User) return n, m, count(*) as likes order by likes limit 10")
    List<Problem> findTop10ByOrderByLikes();
}
