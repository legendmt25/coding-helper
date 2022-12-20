package mk.ukim.finki.coding_helper.rest.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import mk.ukim.finki.coding_helper.core.service.ProblemService;
import mk.ukim.finki.coding_helper.integration.model.Problem;
import mk.ukim.finki.coding_helper.integration.queries.ProblemByLikesQuery;
import mk.ukim.finki.coding_helper.rest.api.ProblemsApi;
import mk.ukim.finki.coding_helper.rest.mappers.ProblemMapper;
import mk.ukim.finki.coding_helper.rest.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;

@CodingHelperController
@RequiredArgsConstructor
public class ProblemController implements ProblemsApi {
  private final ProblemService problemService;
  private final ProblemMapper problemConverter;

  @Override
  public ResponseEntity<List<ProblemEntry>> getProblemEntries() {
    List<Problem> problems = problemService.findAll();
    List<ProblemEntry> entries = problemConverter.convertListOfProblemToRest(problems);
    return ResponseEntity.ok(entries);
  }

  @Override
  public ResponseEntity<List<ProblemByLikes>> getTop10Problems() {
    List<ProblemByLikesQuery> problems = problemService.findTop10ByOrderByLikes();
    List<ProblemByLikes> entries = problemConverter.converyListOfProblemByLikesToRest(problems);
    return ResponseEntity.ok(entries);
  }

  private ProblemRequest createProblemRequest(
      Category category,
      String title,
      Difficulty difficulty,
      String markdown,
      MultipartFile starterCode,
      MultipartFile runnerCode,
      List<MultipartFile> testCases
  ) {
    return new ProblemRequest()
        .category(category)
        .title(title)
        .difficulty(difficulty)
        .markdown(markdown)
        .starterCode(starterCode.getResource())
        .runnerCode(runnerCode.getResource())
        .testCases(testCases.stream().map(MultipartFile::getResource).collect(Collectors.toList()));
  }

  @Override
  @SneakyThrows
  public ResponseEntity<Void> createProblemEntry(
      Category category,
      String title,
      Difficulty difficulty,
      String markdown,
      MultipartFile starterCode,
      MultipartFile runnerCode,
      List<MultipartFile> testCases
  ) {
    ProblemRequest problemRequest =
        createProblemRequest(category, title, difficulty, markdown, starterCode, runnerCode, testCases);
    Problem problem = problemConverter.convertProblem(problemRequest);
    problemService.create(problem, starterCode, runnerCode, testCases);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> editProblemEntry(
      Long id,
      Category category,
      String title,
      Difficulty difficulty,
      String markdown,
      MultipartFile starterCode,
      MultipartFile runnerCode,
      List<MultipartFile> testCases
  ) {
    ProblemRequest problemRequest =
        createProblemRequest(category, title, difficulty, markdown, starterCode, runnerCode, testCases);
    Problem problem = problemConverter.convertProblem(problemRequest);
    problemService.update(id, problem);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<ProblemByLikes> getProblemEntry(Long id) {
    Problem problem = problemService.findById(id);
    ProblemEntry entry = problemConverter.convertProblem(problem);
    ProblemByLikes problemByLikes = new ProblemByLikes()
        .problem(entry)
        .likes((long) (problem.getLikedBy().size()));
    return ResponseEntity.ok(problemByLikes);
  }

  @Override
  public ResponseEntity<Void> toggleLikeProblemEntry(Long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();
    problemService.likeToggle(id, email);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> deleteProblemEntry(Long id) {
    problemService.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Boolean> isProblemEntryLiked(Long id) {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String email = authentication.getName();
    Boolean isLiked = problemService.isLikedBy(id, email);
    return ResponseEntity.ok(isLiked);
  }
}
