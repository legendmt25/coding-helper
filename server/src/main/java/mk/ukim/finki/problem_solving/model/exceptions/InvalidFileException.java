package mk.ukim.finki.problem_solving.model.exceptions;

public class InvalidFileException extends RuntimeException {
    public InvalidFileException() {
        super("Invalid image was sent");
    }
}
