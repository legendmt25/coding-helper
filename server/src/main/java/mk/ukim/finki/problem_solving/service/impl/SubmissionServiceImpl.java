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
import java.util.Arrays;
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

    private void createCodeFile(String userId, Long problemId, String code) throws FileNotFoundException {
        var pw_userCode = new PrintWriter(String.format("res\\users-code\\%s.js", userId));
        BufferedReader br = new BufferedReader(new FileReader(String.format("res\\problems-starter-code\\%d-runner.js", problemId)));
        br.lines().forEach(pw_userCode::print);
        pw_userCode.println();
        pw_userCode.print(code);
        pw_userCode.close();
    }

    private String runCode(SubmissionInput submissionInput) throws InterruptedException, IOException {
        if (submissionInput.getLanguage().equalsIgnoreCase("javascript")) {
            createCodeFile(submissionInput.getUserId(), submissionInput.getProblemId(), submissionInput.getCode());

            var testCases =
                    new File("res/problems-starter-code/")
                            .listFiles(
                                    ((dir, name) -> name.startsWith(submissionInput.getProblemId().toString()) && name.contains("IN"))
                            );
            int n = testCases.length;
            int i = 1;

            for (var testCase : testCases) {
                Process process = Runtime.getRuntime().exec(String.format("cmd.exe /c type %s | res\\compilers\\node.exe res\\users-code\\%s.js", testCase.getPath(), submissionInput.getUserId()));
                var output = new BufferedReader(new InputStreamReader(process.getInputStream())).lines().reduce((a, b) -> b.concat(a)).orElse("");
                var expectedOutput = new BufferedReader(new FileReader(testCase.getPath().replace("IN", "OUT"))).lines().reduce(String::concat).orElse("");
                if (!output.equals(expectedOutput)) {
                    return String.format("Test case %d of %d failed\nOutput: %s\nExpected: %s", i, n, output, expectedOutput);
                }
                ++i;
            }
            return "All test cases passed! Well done!";
        }
        return null;
    }

    @Override
    public String create(SubmissionInput submissionInput) throws IOException, InterruptedException {
        var user = this.userService.findByEmail(submissionInput.getUserId());
        var problem = this.problemService.findById(submissionInput.getProblemId());

        var output = runCode(submissionInput);

        //TODO: check all testcases and set status;
        SubmissionStatus status = output != null && output.startsWith("All") ? SubmissionStatus.ACCEPTED : SubmissionStatus.DECLINED;

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

    @Override
    public void deleteAllByProblemId(Long problemId) {
        this.submissionRepository.deleteAllByProblemId(problemId);
    }

}
