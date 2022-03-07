package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.input.SubmissionInput;
import mk.ukim.finki.problem_solving.model.object.Submission;

import java.util.List;

public interface SubmissionService {
    List<SubmissionDto> getAllSubmissionsForUserByEmail(String email);

    List<SubmissionDto> getAllSubmissionsForUserAndProblem(String email, Long id);

    Submission create(SubmissionInput submissionInput);
}
