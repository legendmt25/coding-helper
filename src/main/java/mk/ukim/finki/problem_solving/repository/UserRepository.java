package mk.ukim.finki.problem_solving.repository;

import mk.ukim.finki.problem_solving.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, String> {

}
