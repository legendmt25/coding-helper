package mk.ukim.finki.coding_helper.rest.controller;

import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import mk.ukim.finki.coding_helper.core.service.ContestService;
import mk.ukim.finki.coding_helper.integration.model.Contest;
import mk.ukim.finki.coding_helper.integration.model.Problem;
import mk.ukim.finki.coding_helper.rest.api.ContestApi;
import mk.ukim.finki.coding_helper.rest.api.ContestsApi;
import mk.ukim.finki.coding_helper.rest.mappers.ContestMapper;
import mk.ukim.finki.coding_helper.rest.mappers.ProblemMapper;
import mk.ukim.finki.coding_helper.rest.model.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@CodingHelperController
@RequiredArgsConstructor
public class ContestController implements ContestsApi, ContestApi {
  private final ContestService contestService;
  private final ContestMapper contestConverter;
  private final ProblemMapper problemConverter;


  @Override
  public ResponseEntity<Void> closeContest(Long id) {
    contestService.closeContest(id);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> deleteContestProblem(Long contestId, Long problemId) {
    contestService.removeProblemFromContest(contestId, problemId);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<ContestProblem> getContestProblem(Long contestId, Long problemId) {
    mk.ukim.finki.coding_helper.integration.model.ContestProblem contestProblem =
        contestService.getContestProblem(contestId, problemId);
    ContestProblem entry = contestConverter.convertContestProblem(contestProblem);
    return ResponseEntity.ok(entry);
  }

  @Override
  public ResponseEntity<Void> setContestProblemScore(Long contestId, Long problemId, SetContestProblemScoreRequest setContestProblemScoreRequest) {
    Long score = setContestProblemScoreRequest.getScore();
    contestService.setProblemScore(contestId, problemId, score);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> startContest(Long id) {
    contestService.startContest(id);
    return ResponseEntity.noContent().build();
  }

  @Override
  public Optional<NativeWebRequest> getRequest() {
    return ContestsApi.super.getRequest();
  }

  @Override
  public ResponseEntity<Void> createContestEntry(ContestBaseEntry contestBaseEntry) {
    Contest contest = contestConverter.convertContest(null, contestBaseEntry);
    contestService.createContest(contest);
    return ResponseEntity.noContent().build();
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
  public ResponseEntity<Void> createContestProblemEntry(
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
    contestService.addProblemToContest(id, problem, starterCode, runnerCode, testCases);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> deleteContestEntry(Long id) {
    contestService.deleteById(id);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<Void> editContestEntry(Long id, ContestBaseEntry contestBaseEntry) {
    Contest contest = contestConverter.convertContest(id, contestBaseEntry);
    contestService.edit(id, contest);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<ContestsResponse> getContestEntries() {
    List<Contest> contests = contestService.findAll();
    ContestsResponse response = contestConverter.toResponse(contests);
    return ResponseEntity.ok(response);
  }

  @Override
  public ResponseEntity<ContestEntry> getContestEntry(Long id) {
    Contest contest = contestService.findById(id);
    ContestEntry entry = contestConverter.convertContest(contest);
    return ResponseEntity.ok(entry);
  }
}
