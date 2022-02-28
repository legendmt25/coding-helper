package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.Problem;

import java.util.List;

public interface ProblemService {
    List<Problem> findAll();
}
