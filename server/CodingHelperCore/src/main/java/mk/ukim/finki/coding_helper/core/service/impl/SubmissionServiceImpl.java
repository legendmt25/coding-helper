package mk.ukim.finki.coding_helper.core.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.coding_helper.core.service.CodeRunnerService;
import mk.ukim.finki.coding_helper.core.service.ProblemService;
import mk.ukim.finki.coding_helper.core.service.SubmissionService;
import mk.ukim.finki.coding_helper.core.service.UserService;
import mk.ukim.finki.coding_helper.integration.dto.SubmissionDto;
import mk.ukim.finki.coding_helper.integration.enums.SubmissionStatus;
import mk.ukim.finki.coding_helper.integration.model.Problem;
import mk.ukim.finki.coding_helper.integration.model.Submission;
import mk.ukim.finki.coding_helper.integration.model.User;
import mk.ukim.finki.coding_helper.integration.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {
  private final SubmissionRepository submissionRepository;
  private final CodeRunnerService codeRunnerService;
  private final UserService userService;
  private final ProblemService problemService;

  @Override
  public List<SubmissionDto> findAllSubmissionsByEmail(String email) {
    return submissionRepository.findAllByUser_Email(email);
  }

  @Override
  public List<SubmissionDto> findAllSubmissionsByUserEmailAndProblemId(String email, Long problemId) {
    return submissionRepository.findAllByUser_EmailAndProblem_Id(email, problemId);
  }

  @Override
  public String create(String email, Long problemId, String code, String language) throws IOException, InterruptedException {
    User user = userService.findByEmail(email);
    Problem problem = problemService.findById(problemId);

    String output = codeRunnerService.runCodeWithTestCases(problemId, email, language, code);

    this.submissionRepository.save(
        new Submission(
            new Date(),
            output != null && output.startsWith("All") ? SubmissionStatus.ACCEPTED : SubmissionStatus.DECLINED,
            language,
            code,
            user,
            problem
        )
    );
    return output;
  }


}
