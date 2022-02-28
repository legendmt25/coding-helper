package mk.ukim.finki.problem_solving.service.impl;

import mk.ukim.finki.problem_solving.model.Problem;
import mk.ukim.finki.problem_solving.repository.ProblemRepository;
import mk.ukim.finki.problem_solving.service.ProblemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProblemServiceImpl implements ProblemService {
    private final ProblemRepository problemRepository;

    public ProblemServiceImpl(ProblemRepository problemRepository) {
        this.problemRepository = problemRepository;
    }

    @Override
    public List<Problem> findAll() {
        return this.problemRepository.findAll();
    }
}
