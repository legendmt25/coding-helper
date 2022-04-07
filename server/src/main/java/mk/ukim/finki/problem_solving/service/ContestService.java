package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.input.ContestInput;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;
import mk.ukim.finki.problem_solving.model.object.Contest;
import mk.ukim.finki.problem_solving.model.object.ContestProblem;

import java.io.IOException;
import java.util.List;

public interface ContestService {
    List<Contest> findAll();

    Contest findById(Long id);

    Contest createContest(ContestInput contestInput);

    ContestProblem addProblemToContest(Long id, ProblemInput problemInput) throws IOException;

    ContestProblem setProblemScore(Long contestId, Long problemId, Long score);

    ContestProblem getContestProblem(Long contestId, Long problemId);

    boolean startContest(Long contestId);

    boolean closeContest(Long id);

    boolean deleteById(Long id);
}
