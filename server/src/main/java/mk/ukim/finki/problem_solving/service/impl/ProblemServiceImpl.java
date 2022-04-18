package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.exceptions.ProblemNotFoundException;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;
import mk.ukim.finki.problem_solving.model.object.Problem;
import mk.ukim.finki.problem_solving.model.queries.ProblemByLikesQuery;
import mk.ukim.finki.problem_solving.repository.ProblemRepository;
import mk.ukim.finki.problem_solving.service.CategoryService;
import mk.ukim.finki.problem_solving.service.ProblemService;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;

@Service
@AllArgsConstructor
public class ProblemServiceImpl implements ProblemService {
    private final ProblemRepository problemRepository;
    private final CategoryService categoryService;
    private final UserService userService;

    @Override
    public List<Problem> findAll() {
        return this.problemRepository.findAll();
    }

    private String getExtension(String fileName) throws FileNotFoundException {
        if (fileName == null) {
            throw new FileNotFoundException();
        }
        return fileName.substring(fileName.lastIndexOf('.'));
    }

    @Override
    public Problem create(ProblemInput problemInput) throws IOException {
        var problem = this.problemRepository.save(
                new Problem(
                        this.categoryService.findById(problemInput.getCategory().getName()),
                        problemInput.getTitle(),
                        problemInput.getDifficulty(),
                        problemInput.getMarkdown(),
                        new String(problemInput.getStarterCode().getInputStream().readAllBytes(), StandardCharsets.UTF_8)
                )
        );
        var path = "res/problems-starter-code";
        var runnerCodeFileName = problemInput.getRunnerCode().getOriginalFilename();
        var starterCodeFileName = problemInput.getStarterCode().getOriginalFilename();
        problemInput.getRunnerCode().transferTo(Path.of(path, problem.getId() + "-runner" + getExtension(runnerCodeFileName)));
        problemInput.getStarterCode().transferTo(Path.of(path, problem.getId() + "-starter" + getExtension(starterCodeFileName)));
        for (var testCase : problemInput.getTestCases()) {
            testCase.transferTo(Path.of(path, problem.getId() + "-" + testCase.getOriginalFilename()));
        }
        return problem;
    }

    @Override
    public Problem findById(Long id) {
        return this.problemRepository.findById(id).orElseThrow(() -> new ProblemNotFoundException(id));
    }

    @Override
    public Problem deleteById(Long id) {
        Problem problem = this.findById(id);
        this.problemRepository.deleteById(id);
        return problem;
    }

    @Override
    public Problem update(Long id, ProblemInput problemInput) {
        Problem problem = this.findById(id);
        problem.setDifficulty(problemInput.getDifficulty());
        problem.setCategory(this.categoryService.findById(problemInput.getCategory().getName()));
        problem.setMarkdown(problemInput.getMarkdown());
        problem.setTitle(problemInput.getTitle());

        return problemRepository.save(problem);
    }

    @Override
    public List<Problem> findAllLByCategories(Collection<String> categories) {
        if (categories.isEmpty()) {
            return this.findAll();
        }
        return this.problemRepository.findAllByCategory_NameIn(categories);
    }

    @Override
    public List<ProblemByLikesQuery> findTop10ByOrderByLikes() {
        return this.problemRepository.findTop10ByOrderByLikes();
    }

    @Override
    public boolean likeToggle(Long id, String email) {
        var problem = this.findById(id);
        boolean isNotLiked = problem.getLikedBy().stream().noneMatch(x -> x.getEmail().equals(email));
        if (isNotLiked) {
            problem.getLikedBy().add(this.userService.findByEmail(email));
        } else {
            problem.getLikedBy().removeIf(x -> x.getEmail().equals(email));
        }
        this.problemRepository.save(problem);
        return isNotLiked;
    }

    @Override
    public boolean isLikedBy(Long problemId, String email) {
        return this.findById(problemId).getLikedBy().stream().anyMatch(x -> x.getEmail().equals(email));
    }

    @Override
    public boolean delete(Long id) {
        Arrays.stream(new File("res/problems-starter-code/").listFiles(((dir, name) -> name.startsWith(id.toString())))).toList().forEach(File::delete);
        this.deleteById(id);
        return true;
    }
}
