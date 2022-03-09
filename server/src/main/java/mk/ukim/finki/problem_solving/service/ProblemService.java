package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.dto.ProblemByLikesDto;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;
import mk.ukim.finki.problem_solving.model.object.Problem;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

public interface ProblemService {
    List<Problem> findAll();

    Problem create(ProblemInput problemInput) throws IOException;

    Problem findById(Long id);

    Problem deleteById(Long id);

    Problem update(Long id, ProblemInput problemInput);

    List<Problem> findAllLByCategories(Collection<String> categories);

    List<ProblemByLikesDto> findTop10ByOrderByLikes();

    boolean likeToggle(Long id, String email);

    boolean isLikedBy(Long problemId, String email);

    boolean delete(Long id);
}
