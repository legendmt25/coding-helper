package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.input.SubmissionInput;
import mk.ukim.finki.problem_solving.model.object.Submission;
import mk.ukim.finki.problem_solving.repository.SubmissionRepository;
import mk.ukim.finki.problem_solving.service.ProblemService;
import mk.ukim.finki.problem_solving.service.SubmissionService;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class SubmissionServiceImpl implements SubmissionService {

    private final SubmissionRepository submissionRepository;
    private final UserService userService;
    private final ProblemService problemService;

    @Override
    public List<Submission> getAllSubmissionsForUserByEmail(String email) {
        return submissionRepository.findAllByUser_Email(email);
    }

    public List<Submission> getAllSubmissionsForUserAndProblem(String email, Long problemId) {
        return submissionRepository.findAllByUser_EmailAndProblem_Id(email, problemId);
    }

    @Override
    public Submission create(SubmissionInput submissionInput) {
        var user = this.userService.findByEmail(submissionInput.getUserId());
        var problem = this.problemService.findById(submissionInput.getProblemId());
        return submissionRepository.save(
                new Submission(
                        submissionInput.getTimeSubmitted(),
                        submissionInput.getStatus(),
                        submissionInput.getLanguage(),
                        submissionInput.getCode(),
                        user,
                        problem
                )
        );
    }
}
