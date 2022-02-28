package mk.ukim.finki.problem_solving.model.exceptions;

public class UserNotFoundException extends RuntimeException {
    public UserNotFoundException(String email) {
        super(String.format("User with email: %s doesn't exist", email));
    }
}
