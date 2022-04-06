package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.ContestStatus;
import mk.ukim.finki.problem_solving.model.exceptions.ContestNotFoundException;
import mk.ukim.finki.problem_solving.model.input.ContestInput;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;
import mk.ukim.finki.problem_solving.model.object.Contest;
import mk.ukim.finki.problem_solving.model.object.Problem;
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
    public Problem addProblemToContest(Long id, ProblemInput problemInput) throws IOException {
        var contest = this.findById(id);
        var problem = problemService.create(problemInput);
        contest.getProblems().add(problem);
        contestRepository.save(contest);
        return problem;
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
}
