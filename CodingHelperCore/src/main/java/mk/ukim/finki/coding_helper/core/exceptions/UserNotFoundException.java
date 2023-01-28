package mk.ukim.finki.coding_helper.core.exceptions;

public class UserNotFoundException extends RuntimeException {
  public UserNotFoundException(String email) {
    super(String.format("User with email: %s doesn't exist", email));
  }
}
