package mk.ukim.finki.coding_helper.core.exceptions;

public class UserAlreadyExistsException extends RuntimeException {
  public UserAlreadyExistsException(String email) {
    super(String.format("User %s already exists", email));
  }
}
