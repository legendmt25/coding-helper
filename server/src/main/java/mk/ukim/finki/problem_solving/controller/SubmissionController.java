package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.input.SubmissionInput;
import mk.ukim.finki.problem_solving.model.object.Submission;
import mk.ukim.finki.problem_solving.model.resBody.OutputResBody;
import mk.ukim.finki.problem_solving.service.SubmissionService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class SubmissionController {
    private final SubmissionService submissionService;

    @PostMapping("/submission/create")
    OutputResBody create(@RequestBody SubmissionInput submissionInput) throws IOException, InterruptedException {
        return new OutputResBody(this.submissionService.create(submissionInput));
    }

    @PostMapping("/submissions")
    List<SubmissionDto> submissions(@RequestBody Map<String, String> map) {
        return this.submissionService.getAllSubmissionsForUserByEmail(map.get("email"));
    }
}
