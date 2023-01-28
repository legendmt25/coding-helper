package mk.ukim.finki.coding_helper.integration.repository;

import mk.ukim.finki.coding_helper.integration.model.User;
import mk.ukim.finki.coding_helper.integration.queries.UserWithTotalSolvedQuery;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends Neo4jRepository<User, String> {

    @Query("match (s:Submission)-[ru:USER]->(u:User) with s, u where s.status = 'ACCEPTED' " +
            "match (p:Problem)<-[rp:PROBLEM]-(s) with distinct u, p return u as user, count(p) as solved order by solved desc")
    List<UserWithTotalSolvedQuery> findAllWithTotalAcceptedSubmissions();
}
