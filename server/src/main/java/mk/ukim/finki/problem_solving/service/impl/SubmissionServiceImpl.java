package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.enums.SubmissionStatus;
import mk.ukim.finki.problem_solving.model.input.SubmissionInput;
import mk.ukim.finki.problem_solving.model.object.Submission;
import mk.ukim.finki.problem_solving.repository.SubmissionRepository;
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
    private final UserService userService;
    private final ProblemService problemService;

    @Override
    public List<SubmissionDto> getAllSubmissionsForUserByEmail(String email) {
        return submissionRepository.findAllByUser_Email(email);
    }

    public List<SubmissionDto> getAllSubmissionsForUserAndProblem(String email, Long problemId) {
        return submissionRepository.findAllByUser_EmailAndProblem_Id(email, problemId);
    }

    private String runCode(SubmissionInput submissionInput) throws InterruptedException, IOException {
        if (submissionInput.getLanguage().equalsIgnoreCase("javascript")) {
            var pw_userCode = new PrintWriter(String.format("res\\users-code\\%s.js", submissionInput.getUserId()));
            BufferedReader br = new BufferedReader(new FileReader(String.format("res\\problems-starter-code\\%d-runner.js", submissionInput.getProblemId())));
            br.lines().forEach(pw_userCode::print);
            pw_userCode.println();
            pw_userCode.print(submissionInput.getCode());
            pw_userCode.close();

            Process process = Runtime.getRuntime().exec(String.format("cmd.exe /c echo 2,[2,3,4] | res\\compilers\\node.exe res\\users-code\\%s.js", submissionInput.getUserId()));
            var output = new BufferedReader(new InputStreamReader(process.getInputStream())).lines().reduce((a, b) -> b.concat(a)).orElse("");
            assert process.waitFor() == 0;
            return output;
        }
        return null;
    }

    @Override
    public String create(SubmissionInput submissionInput) throws IOException, InterruptedException {
        var user = this.userService.findByEmail(submissionInput.getUserId());
        var problem = this.problemService.findById(submissionInput.getProblemId());

        var output = runCode(submissionInput);

        //TODO: check all testcases and set status;
        SubmissionStatus status = SubmissionStatus.ACCEPTED;

        this.submissionRepository.save(
                new Submission(
                        new Date(),
                        status,
                        submissionInput.getLanguage(),
                        submissionInput.getCode(),
                        user,
                        problem
                )
        );

        return output;
    }
}
