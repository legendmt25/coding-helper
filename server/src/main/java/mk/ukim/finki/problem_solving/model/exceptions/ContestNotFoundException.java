package mk.ukim.finki.problem_solving.model.exceptions;

public class ContestNotFoundException extends RuntimeException {
    public ContestNotFoundException(Long id) {
        super("Contest with id: " + id + " not found");
    }
}
