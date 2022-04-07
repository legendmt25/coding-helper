package mk.ukim.finki.problem_solving.model.exceptions;

public class ContestStatusNotOpenException extends RuntimeException {
    public ContestStatusNotOpenException(Long id) {
        super("Contest id: " + id + " doesn't have status OPEN");
    }
}
