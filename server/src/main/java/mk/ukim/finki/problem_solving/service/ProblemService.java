package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.object.Category;
import mk.ukim.finki.problem_solving.model.object.Problem;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;

import java.util.Collection;
import java.util.List;

public interface ProblemService {
    List<Problem> findAll();

    Problem create(ProblemInput problemInput);

    Problem findById(Long id);

    Problem deleteById(Long id);

    Problem update(Long id, ProblemInput problemInput);

    List<Problem> findAllLByCategories(Collection<String> categories);

    List<Problem> findTop10ByOrderByLikes();
}
