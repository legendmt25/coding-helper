package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.input.SubmissionInput;

import java.io.IOException;
import java.util.List;

public interface SubmissionService {
    List<SubmissionDto> getAllSubmissionsForUserByEmail(String email);

    List<SubmissionDto> getAllSubmissionsForUserAndProblem(String email, Long id);

    String create(SubmissionInput submissionInput) throws IOException, InterruptedException;

    void deleteAllByProblemId(Long problemId);
}
