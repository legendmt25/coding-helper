package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.dto.UsernameWithTotalSolvedDto;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import mk.ukim.finki.problem_solving.model.object.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
  List<User> findAll();

  User findByEmail(String email);

  boolean register(UserInput userInput);

  String updateAvatar(MultipartFile image, String userEmail) throws IOException;

  List<UsernameWithTotalSolvedDto> findAllWithTotalAcceptedSubmissions();

}
