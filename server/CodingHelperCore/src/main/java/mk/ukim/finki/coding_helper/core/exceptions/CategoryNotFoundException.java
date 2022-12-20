package mk.ukim.finki.coding_helper.core.exceptions;

public class CategoryNotFoundException extends RuntimeException {
  public CategoryNotFoundException(String name) {
    super(String.format("Category %s could not be found", name));
  }
}
