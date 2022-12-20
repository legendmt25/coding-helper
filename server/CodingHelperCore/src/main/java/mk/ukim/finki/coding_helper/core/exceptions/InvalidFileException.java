package mk.ukim.finki.coding_helper.core.exceptions;

public class InvalidFileException extends RuntimeException {
  public InvalidFileException() {
    super("Invalid image was sent");
  }
}
