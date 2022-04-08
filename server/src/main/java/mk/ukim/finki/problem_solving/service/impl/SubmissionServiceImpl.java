package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.enums.SubmissionStatus;
import mk.ukim.finki.problem_solving.model.input.SubmissionInput;
import mk.ukim.finki.problem_solving.model.object.Submission;
import mk.ukim.finki.problem_solving.repository.SubmissionRepository;
import mk.ukim.finki.problem_solving.service.CodeRunnerService;
import mk.ukim.finki.problem_solving.service.ProblemService;
import mk.ukim.finki.problem_solving.service.SubmissionService;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.Date;
import java.util.List;

@Service
@AllArgsConstructor
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
    public String create(SubmissionInput submissionInput) throws IOException, InterruptedException {
        var user = this.userService.findByEmail(submissionInput.getUserId());
        var problem = this.problemService.findById(submissionInput.getProblemId());

        var output = codeRunnerService.runCodeWithTestCases(submissionInput.getProblemId(), submissionInput.getUserId(), submissionInput.getLanguage(), submissionInput.getCode());
        this.submissionRepository.save(
                new Submission(
                        new Date(),
                        output != null && output.startsWith("All") ? SubmissionStatus.ACCEPTED : SubmissionStatus.DECLINED,
                        submissionInput.getLanguage(),
                        submissionInput.getCode(),
                        user,
                        problem
                )
        );
        return output;
    }
}
