package mk.ukim.finki.problem_solving.model.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
  public UserAlreadyExistsException(String email) {
    super(String.format("User %s already exists", email));
  }
}
