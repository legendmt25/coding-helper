package mk.ukim.finki.coding_helper.core.exceptions;

public class ContestStatusNotOpenException extends RuntimeException {
  public ContestStatusNotOpenException(Long id) {
    super("Contest id: " + id + " doesn't have status OPEN");
  }
}
