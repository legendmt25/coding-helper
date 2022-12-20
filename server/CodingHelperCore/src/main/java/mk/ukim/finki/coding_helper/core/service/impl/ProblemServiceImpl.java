package mk.ukim.finki.coding_helper.core.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.coding_helper.core.exceptions.ProblemNotFoundException;
import mk.ukim.finki.coding_helper.core.service.CategoryService;
import mk.ukim.finki.coding_helper.core.service.ProblemService;
import mk.ukim.finki.coding_helper.core.service.UserService;
import mk.ukim.finki.coding_helper.integration.model.Category;
import mk.ukim.finki.coding_helper.integration.model.Problem;
import mk.ukim.finki.coding_helper.integration.queries.ProblemByLikesQuery;
import mk.ukim.finki.coding_helper.integration.repository.ProblemRepository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.util.Arrays;
import java.util.Collection;
import java.util.List;
import java.util.function.BiFunction;

@Service
@RequiredArgsConstructor
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
  public Problem create(
      Problem problem,
      MultipartFile starterCode,
      MultipartFile runnerCode,
      List<MultipartFile> testCases
  ) throws IOException {
    Category category = categoryService.findById(problem.getCategory().getName());
    var path = "res/problems-starter-code";
    var runnerCodeFileName = runnerCode.getOriginalFilename();
    var starterCodeFileName = starterCode.getOriginalFilename();
    runnerCode
        .transferTo(Path.of(path, problem.getId() + "-runner" + getExtension(runnerCodeFileName)));
    starterCode
        .transferTo(Path.of(path, problem.getId() + "-starter" + getExtension(starterCodeFileName)));
    for (var testCase : testCases) {
      testCase.transferTo(Path.of(path, problem.getId() + "-" + testCase.getOriginalFilename()));
    }
    return problemRepository.save(problem);
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
  public Problem update(Long id, Problem problemInput) {
    Category category = this.categoryService.findById(problemInput.getCategory().getName());
    Problem problem = this.findById(id);
    problem.setDifficulty(problemInput.getDifficulty());
    problem.setCategory(category);
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
    Problem problem = findById(id);
    boolean isNotLiked = problem.getLikedBy().stream().noneMatch(x -> x.getEmail().equals(email));
    if (isNotLiked) {
      problem.getLikedBy().add(this.userService.findByEmail(email));
    } else {
      problem.getLikedBy().removeIf(x -> x.getEmail().equals(email));
    }
    problemRepository.save(problem);
    return isNotLiked;
  }

  @Override
  public boolean isLikedBy(Long problemId, String email) {
    return findById(problemId)
        .getLikedBy()
        .stream()
        .anyMatch(x -> x.getEmail().equals(email));
  }

  @Override
  public boolean delete(Long id) {
    BiFunction<File, String, Boolean> filterFunction = (dir, name) -> name.startsWith(id.toString());
    File[] files = new File("res/problems-starter-code/").listFiles(filterFunction::apply);
    Arrays.stream(files).forEach(File::delete);
    this.deleteById(id);
    return true;
  }
}
