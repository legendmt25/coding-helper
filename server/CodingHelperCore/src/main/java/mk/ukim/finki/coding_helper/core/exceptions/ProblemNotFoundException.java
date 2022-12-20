package mk.ukim.finki.coding_helper.core.exceptions;

public class ProblemNotFoundException extends RuntimeException {
  public ProblemNotFoundException(Long id) {
    super(String.format("Problem %d could not be found", id));
  }
}
