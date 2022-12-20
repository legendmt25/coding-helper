package mk.ukim.finki.coding_helper.core.exceptions;

public class ContestNotFoundException extends RuntimeException {
  public ContestNotFoundException(Long id) {
    super("Contest with id: " + id + " not found");
  }
}
