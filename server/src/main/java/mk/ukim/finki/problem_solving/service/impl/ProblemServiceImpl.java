package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.exceptions.ProblemNotFoundException;
import mk.ukim.finki.problem_solving.model.object.Problem;
import mk.ukim.finki.problem_solving.model.input.ProblemInput;
import mk.ukim.finki.problem_solving.repository.ProblemRepository;
import mk.ukim.finki.problem_solving.service.CategoryService;
import mk.ukim.finki.problem_solving.service.ProblemService;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;

@Service
@AllArgsConstructor
public class ProblemServiceImpl implements ProblemService {
    private final ProblemRepository problemRepository;
    private final CategoryService categoryService;

    @Override
    public List<Problem> findAll() {
        return this.problemRepository.findAll();
    }

    @Override
    public Problem create(ProblemInput problemInput) {
        return this.problemRepository.save(
                new Problem(
                        this.categoryService.findById(problemInput.getCategoryName()),
                        problemInput.getTitle(),
                        problemInput.getDifficulty(),
                        problemInput.getMarkdown()
                )
        );
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
        problem.setCategory(this.categoryService.findById(problemInput.getCategoryName()));
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
}
