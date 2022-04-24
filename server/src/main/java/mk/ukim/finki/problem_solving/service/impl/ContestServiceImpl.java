package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.ContestStatus;
import mk.ukim.finki.problem_solving.model.exceptions.ContestNotFoundException;
import mk.ukim.finki.problem_solving.model.exceptions.ContestStatusNotOpenException;
import mk.ukim.finki.problem_solving.model.exceptions.ProblemNotFoundException;
import mk.ukim.finki.problem_solving.model.input.ContestInput;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;
import mk.ukim.finki.problem_solving.model.object.Contest;
import mk.ukim.finki.problem_solving.model.object.ContestProblem;
import mk.ukim.finki.problem_solving.repository.ContestRepository;
import mk.ukim.finki.problem_solving.service.ContestService;
import mk.ukim.finki.problem_solving.service.ProblemService;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@AllArgsConstructor
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
    public ContestProblem addProblemToContest(Long id, ProblemInput problemInput) throws IOException {
        var contest = this.findById(id);
        if (contest.getStatus() != ContestStatus.OPEN)
            throw new ContestStatusNotOpenException(id);

        var problem = problemService.create(problemInput);
        var contestProblem = new ContestProblem(problem, 0L);
        contest.getProblems().add(contestProblem);
        contestRepository.save(contest);
        return contestProblem;
    }

    @Override
    public boolean removeProblemFromContest(Long contestId, Long problemId) {
        var contest = this.findById(contestId);
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

        var contestProblem = contest.getProblems().stream()
                .filter(problem -> problem.getProblem().getId().equals(problemId))
                .findFirst()
                .orElseThrow(() -> new ProblemNotFoundException(problemId));
        contestProblem.setScore(score);
        contestRepository.save(contest);
        return contestProblem;
    }

    @Override
    public boolean startContest(Long contestId) {
        var contest = this.findById(contestId);
        if (contest.getStatus() != ContestStatus.OPEN) {
            return false;
        }
        contest.setStatus(ContestStatus.STARTED);
        contestRepository.save(contest);
        return true;
    }

    @Override
    public boolean closeContest(Long id) {
        var contest = this.findById(id);
        if (contest.getStatus() != ContestStatus.STARTED) {
            return false;
        }
        contest.setStatus(ContestStatus.CLOSED);
        contestRepository.save(contest);
        return true;
    }

    @Override
    public Contest createContest(ContestInput contestInput) {
        return contestRepository.save(
                new Contest(
                        contestInput.getName(),
                        contestInput.getDuration(),
                        ContestStatus.OPEN,
                        contestInput.getStartsOn()
                )
        );
    }

    @Override
    public Contest edit(Long id, ContestInput contestInput) {
        var contest = this.findById(id);
        contest.setDuration(contestInput.getDuration().toString());
        contest.setName(contestInput.getName());
        contest.setStartsOn(contestInput.getStartsOn());
        return contestRepository.save(contest);
    }

    @Override
    public boolean deleteById(Long id) {
        contestRepository.deleteById(id);
        return true;
    }
}
