package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.reqBody.RunCodeReqBody;
import mk.ukim.finki.problem_solving.model.resBody.OutputResBody;
import mk.ukim.finki.problem_solving.service.CodeRunnerService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

@RequestMapping("/api")
@RestController
@AllArgsConstructor
public class CodeRunnerController {
  private final CodeRunnerService codeRunnerService;

  @PostMapping("/run-code")
  OutputResBody runCode(@RequestBody RunCodeReqBody body) throws IOException {
    String codeFilePath = codeRunnerService.createCodeFile(
        body.getProblemId(),
        body.getFileName(),
        body.getLanguage(),
        body.getCode()
    );

    return new OutputResBody(
        codeRunnerService.runCode(
            body.getInput(),
            codeFilePath,
            body.getLanguage()
        )
    );
  }
}
