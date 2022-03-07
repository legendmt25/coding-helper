package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.input.SubmissionInput;
import mk.ukim.finki.problem_solving.model.object.Submission;
import mk.ukim.finki.problem_solving.service.SubmissionService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class SubmissionController {
    private final SubmissionService submissionService;

    @PostMapping("/submission/create")
    Submission create(@RequestBody SubmissionInput submissionInput) {
        return this.submissionService.create(submissionInput);
    }

    @PostMapping("/submissions")
    List<SubmissionDto> submissions(@RequestBody Map<String, String> map) {
        return this.submissionService.getAllSubmissionsForUserByEmail(map.get("email"));
    }
}
