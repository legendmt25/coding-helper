package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.enums.Difficulty;
import mk.ukim.finki.problem_solving.model.input.ContestInput;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;
import mk.ukim.finki.problem_solving.model.object.Contest;
import mk.ukim.finki.problem_solving.model.object.Problem;
import mk.ukim.finki.problem_solving.service.ContestService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api")
@RestController
@AllArgsConstructor
public class ContestController {
    private final ContestService contestService;

    @GetMapping("/contests")
    List<Contest> contests() {
        return contestService.findAll();
    }

    @GetMapping("/contest/{id}")
    Contest contest(@PathVariable Long id) {
        return contestService.findById(id);
    }

    @PostMapping("/contest/create")
    Contest createContest(@RequestBody ContestInput contestInput) {
        return contestService.createContest(contestInput);
    }

    @PostMapping("/contest/{id}/add-problem")
    Problem addProblemToContest(@PathVariable Long id,
                                @RequestPart MultipartFile starterCode,
                                @RequestPart MultipartFile runnerCode,
                                @RequestParam("testCases") MultipartFile[] testCases,
                                @RequestParam String title,
                                @RequestParam String categoryName,
                                @RequestParam String markdown,
                                @RequestParam Difficulty difficulty) throws IOException {
        var problemInput = new ProblemInput(categoryName, title, difficulty, markdown, starterCode, runnerCode, testCases);
        return contestService.addProblemToContest(id, problemInput);
    }
}
