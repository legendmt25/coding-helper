package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.dto.UsernameWithTotalSolvedDto;
import mk.ukim.finki.problem_solving.model.input.SubmissionInput;
import mk.ukim.finki.problem_solving.model.reqBody.SubmissionsFilterReqBody;
import mk.ukim.finki.problem_solving.model.resBody.OutputResBody;
import mk.ukim.finki.problem_solving.service.SubmissionService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;

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
    List<SubmissionDto> submissions(@RequestBody SubmissionsFilterReqBody body) {
        if (body.getProblemId() == null) {
            return this.submissionService.findAllSubmissionsByEmail(body.getUserEmail());
        }
        return this.submissionService.findAllSubmissionsByUserEmailAndProblemId(body.getUserEmail(), body.getProblemId());
    }

}
