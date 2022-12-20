package mk.ukim.finki.coding_helper.rest.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.coding_helper.core.service.UserService;
import mk.ukim.finki.coding_helper.rest.mappers.UserMapper;
import mk.ukim.finki.coding_helper.rest.model.UsernameWithTotalSolvedDto;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@CodingHelperController
@RequiredArgsConstructor
public class UserController {
  private final UserService userService;
  private final UserMapper userConverter;

  @PostMapping("/user/upload-avatar")
  public String uploadAvatar(
      @RequestPart("file") MultipartFile file
  ) throws IOException {
    String email = SecurityContextHolder.getContext().getAuthentication().getName();
    return userService.updateAvatar(file, email);
  }

  @GetMapping("/users-with-total-accepted")
  ResponseEntity<List<UsernameWithTotalSolvedDto>> usersWithTotalSolved() {
    List<mk.ukim.finki.coding_helper.integration.dto.UsernameWithTotalSolvedDto> data =
        userService.findAllWithTotalAcceptedSubmissions();
    List<UsernameWithTotalSolvedDto> entries = userConverter.convertListOfUsernameWithTotalSolvedToRest(data);
    return ResponseEntity.ok(entries);
  }
}
