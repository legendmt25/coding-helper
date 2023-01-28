package mk.ukim.finki.coding_helper.rest.exceptionhandler;

import lombok.Builder;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

@Builder
@Getter
public class ErrorResponse {
  private String message;
  private HttpStatus status;
  private LocalDateTime timestamp;
}
