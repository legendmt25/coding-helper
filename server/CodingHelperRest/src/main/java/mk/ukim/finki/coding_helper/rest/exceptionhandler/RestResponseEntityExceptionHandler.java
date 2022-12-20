package mk.ukim.finki.coding_helper.rest.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;
import java.time.LocalDateTime;

@ControllerAdvice
public class RestResponseEntityExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(value = RuntimeException.class)
  ResponseEntity<Object> handleUnknownException(RuntimeException ex) {
    ErrorResponse errorResponse = ErrorResponse.builder()
        .message(ex.getMessage())
        .status(HttpStatus.BAD_REQUEST)
        .timestamp(LocalDateTime.now())
        .build();
    return buildResponseEntity(errorResponse);
  }

  @ExceptionHandler(value = IOException.class)
  ResponseEntity<Object> handleIOException(RuntimeException ex) {
    ErrorResponse errorResponse = ErrorResponse.builder()
        .message(ex.getMessage())
        .status(HttpStatus.BAD_REQUEST)
        .timestamp(LocalDateTime.now())
        .build();
    return buildResponseEntity(errorResponse);
  }

  ResponseEntity<Object> buildResponseEntity(ErrorResponse errorResponse) {
    return new ResponseEntity<>(errorResponse, errorResponse.getStatus());
  }
}
