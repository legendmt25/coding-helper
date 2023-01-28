package mk.ukim.finki.coding_helper.core.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.coding_helper.core.exceptions.ContestNotFoundException;
import mk.ukim.finki.coding_helper.core.exceptions.ContestStatusNotOpenException;
import mk.ukim.finki.coding_helper.core.exceptions.ProblemNotFoundException;
import mk.ukim.finki.coding_helper.core.service.ContestService;
import mk.ukim.finki.coding_helper.core.service.ProblemService;
import mk.ukim.finki.coding_helper.integration.enums.ContestStatus;
import mk.ukim.finki.coding_helper.integration.model.Contest;
import mk.ukim.finki.coding_helper.integration.model.ContestProblem;
import mk.ukim.finki.coding_helper.integration.model.Problem;
import mk.ukim.finki.coding_helper.integration.repository.ContestRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContestServiceImpl implements ContestService {
  private final ContestRepository contestRepository;
  private final ProblemService problemService;

  @Override
  public List<Contest> findAll() {
    return contestRepository.findAll();
  }

  @Override
  public Contest findById(Long id) {
    return contestRepository.findById(id).orElseThrow(() -> new ContestNotFoundException(id));
  }

  @Override
  public ContestProblem addProblemToContest(
      Long id,
      Problem problem,
      MultipartFile starterCode,
      MultipartFile runnerCode,
      List<MultipartFile> testCases
  ) throws IOException {
    Contest contest = this.findById(id);
    if (contest.getStatus() != ContestStatus.OPEN)
      throw new ContestStatusNotOpenException(id);

    Problem createdProblem = problemService.create(problem, starterCode, runnerCode, testCases);
    ContestProblem contestProblem = new ContestProblem(createdProblem, 0L);
    contest.getProblems().add(contestProblem);
    contestRepository.save(contest);
    return contestProblem;
  }

  @Override
  public boolean removeProblemFromContest(Long contestId, Long problemId) {
    Contest contest = this.findById(contestId);
    if (contest.getStatus() != ContestStatus.OPEN)
      return false;
    contest.getProblems().removeIf(x -> x.getProblem().getId().equals(problemId));
    problemService.delete(problemId);
    contestRepository.save(contest);
    return true;
  }

  @Override
  public ContestProblem getContestProblem(Long contestId, Long problemId) {
    var contest = this.findById(contestId);
    return contest.getProblems().stream()
        .filter(problem -> problem.getProblem().getId().equals(problemId))
        .findFirst().orElseThrow(() -> new ProblemNotFoundException(problemId));
  }

  @Override
  public ContestProblem setProblemScore(Long contestId, Long problemId, Long score) {
    var contest = this.findById(contestId);
    if (contest.getStatus() != ContestStatus.OPEN)
      throw new ContestStatusNotOpenException(contestId);

    ContestProblem contestProblem = contest.getProblems().stream()
        .filter(problem -> problem.getProblem().getId().equals(problemId))
        .findFirst()
        .orElseThrow(() -> new ProblemNotFoundException(problemId));
    contestProblem.setScore(score);
    contestRepository.save(contest);
    return contestProblem;
  }

  @Override
  public boolean startContest(Long contestId) {
    Contest contest = this.findById(contestId);
    if (contest.getStatus() != ContestStatus.OPEN) {
      return false;
    }
    contest.setStatus(ContestStatus.STARTED);
    contestRepository.save(contest);
    return true;
  }

  @Override
  public boolean closeContest(Long id) {
    Contest contest = this.findById(id);
    if (contest.getStatus() != ContestStatus.STARTED) {
      return false;
    }
    contest.setStatus(ContestStatus.CLOSED);
    contestRepository.save(contest);
    return true;
  }

  @Override
  public Contest createContest(Contest contest) {
    return contestRepository.save(contest);
  }

  @Override
  public Contest edit(Long id, Contest contest) {
    Contest old = this.findById(id);
    old.setDuration(contest.getDuration());
    old.setName(contest.getName());
    old.setStartsOn(contest.getStartsOn());
    return contestRepository.save(old);
  }

  @Override
  public void deleteById(Long id) {
    contestRepository.deleteById(id);
  }
}
