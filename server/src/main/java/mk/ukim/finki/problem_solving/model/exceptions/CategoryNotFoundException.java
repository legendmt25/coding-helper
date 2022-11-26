package mk.ukim.finki.problem_solving.model.exceptions;

public class CategoryNotFoundException extends RuntimeException {
  public CategoryNotFoundException(String name) {
    super(String.format("Category %s could not be found", name));
  }
}
