package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.object.User;
import mk.ukim.finki.problem_solving.model.queries.UserWithTotalSolvedQuery;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends Neo4jRepository<User, String> {

    @Query("match (s:Submission)-[ru:USER]->(u:User) with s, u where s.status = 'DECLINED' " +
            "match (p:Problem)<-[rp:PROBLEM]-(s) with distinct u, p return u as user, count(p) as solved order by solved desc")
    List<UserWithTotalSolvedQuery> findAllWithTotalAcceptedSubmissions();
}
