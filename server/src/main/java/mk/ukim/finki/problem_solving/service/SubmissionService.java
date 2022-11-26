package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.input.SubmissionInput;

import java.io.IOException;
import java.util.List;

public interface SubmissionService {
  List<SubmissionDto> findAllSubmissionsByEmail(String email);

  List<SubmissionDto> findAllSubmissionsByUserEmailAndProblemId(String email, Long problemId);

  String create(SubmissionInput submissionInput) throws IOException, InterruptedException;

}
