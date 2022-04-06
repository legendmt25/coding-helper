package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.input.ContestInput;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;
import mk.ukim.finki.problem_solving.model.object.Contest;
import mk.ukim.finki.problem_solving.model.object.Problem;

import java.io.IOException;
import java.util.List;

public interface ContestService {
    List<Contest> findAll();

    Contest findById(Long id);

    Contest createContest(ContestInput contestInput);

    public Problem addProblemToContest(Long id, ProblemInput problemInput) throws IOException;
}
