package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.service.CodeRunnerService;
import org.springframework.stereotype.Service;

import java.io.*;

@Service
@AllArgsConstructor
public class CodeRunnerServiceImpl implements CodeRunnerService {
    @Override
    public String runTestCases(File[] testCases, String codeFilePath, String language) throws IOException {
        int n = testCases.length;
        int i = 1;
        for (var testCase : testCases) {
            var input = new BufferedReader(new FileReader(testCase.getPath()))
                    .lines().reduce(String::concat).orElse("");
            var output = this.runCode(input, codeFilePath, language);
            var expectedOutput = new BufferedReader(new FileReader(testCase.getPath().replace("IN", "OUT")))
                    .lines().reduce(String::concat).orElse("");
            if (!output.equals(expectedOutput))
                return String.format("Test case %d of %d failed\nOutput: %s\nExpected: %s", i, n, output, expectedOutput);
            ++i;
        }
        return "All test cases passed! Well done!";
    }

    @Override
    public String runCode(String input, String codeFilePath, String language) throws IOException {
        String compilerPath = null;
        if (language.equalsIgnoreCase("javascript"))
            compilerPath = "res\\compilers\\node.exe";

        return new BufferedReader(new InputStreamReader(Runtime.getRuntime()
                .exec(String.format("cmd.exe /c echo %s | %s %s", input, compilerPath, codeFilePath)).
                getInputStream()))
                .lines().reduce(String::concat).orElse("");
    }

    @Override
    public String runCodeWithTestCases(Long problemId, String fileName, String language, String code) throws IOException {
        var codeFilePath = this.createCodeFile(problemId, fileName, language, code);
        var testCases =
                new File("res/problems-starter-code/")
                        .listFiles(
                                ((dir, name) -> name.startsWith(problemId.toString()) && name.contains("IN"))
                        );
        return runTestCases(testCases, codeFilePath, language);
    }

    @Override
    public String createCodeFile(Long problemId, String fileName, String language, String code) throws FileNotFoundException {
        var codeFilePath = String.format("res\\users-code\\%s", fileName);
        String ext = null;
        if (language.equalsIgnoreCase("javascript")) {
            ext = ".js";
        }

        var pw_userCode = new PrintWriter(codeFilePath + ext);
        new BufferedReader(new FileReader(String.format("res\\problems-starter-code\\%d-runner%s", problemId, ext)))
                .lines().forEach(pw_userCode::print);
        pw_userCode.println();
        pw_userCode.print(code);
        pw_userCode.close();
        return codeFilePath + ext;
    }
}
