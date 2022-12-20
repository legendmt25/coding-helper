package mk.ukim.finki.coding_helper.core.service;

import mk.ukim.finki.coding_helper.integration.model.Problem;
import mk.ukim.finki.coding_helper.integration.queries.ProblemByLikesQuery;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Collection;
import java.util.List;

public interface ProblemService {
  List<Problem> findAll();

  Problem create(
      Problem problem,
      MultipartFile starterCode,
      MultipartFile runnerCode,
      List<MultipartFile> testCases
  ) throws IOException;

  Problem findById(Long id);

  Problem deleteById(Long id);

  Problem update(Long id, Problem problem);

  List<Problem> findAllLByCategories(Collection<String> categories);

  List<ProblemByLikesQuery> findTop10ByOrderByLikes();

  boolean likeToggle(Long id, String email);

  boolean isLikedBy(Long problemId, String email);

  boolean delete(Long id);
}
