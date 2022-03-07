package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.object.Problem;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;
import mk.ukim.finki.problem_solving.model.reqBody.ProblemsByCategoriesReqBody;
import mk.ukim.finki.problem_solving.service.ProblemService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class ProblemController {

    private final ProblemService problemService;

    @GetMapping("/problems")
    ResponseEntity<List<Problem>> getAllProblems() {
        return ResponseEntity.ok().body(problemService.findAll());
    }

    @GetMapping("/problem/{id}")
    Problem getProblem(@PathVariable Long id) {
        return problemService.findById(id);
    }

    @PostMapping("/problem/create")
    ResponseEntity<Problem> create(@RequestBody ProblemInput problemInput) {
        return ResponseEntity.ok().body(this.problemService.create(problemInput));
    }

    @PostMapping("/problems")
    List<Problem> getAllProblemsByCategories(@RequestBody ProblemsByCategoriesReqBody body) {
        return this.problemService.findAllLByCategories(body.getCategories());
    }

    @DeleteMapping("/problem/{id}/delete")
    Problem delete(@PathVariable Long id) {
        return this.problemService.deleteById(id);
    }

    @PostMapping("/problem/{id}/edit")
    Problem edit(@PathVariable Long id, @RequestBody ProblemInput problemInput) {
        return this.problemService.update(id, problemInput);
    }

    @GetMapping("/problems/top10")
    List<Problem> getTop10() {
        return this.problemService.findTop10ByOrderByLikes();
    }

}
