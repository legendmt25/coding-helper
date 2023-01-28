package mk.ukim.finki.coding_helper.core.service;

import mk.ukim.finki.coding_helper.integration.dto.UsernameWithTotalSolvedDto;
import mk.ukim.finki.coding_helper.integration.model.RegisterModel;
import mk.ukim.finki.coding_helper.integration.model.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
  List<User> findAll();

  User findByEmail(String email);

  void register(RegisterModel registerModel);

  String updateAvatar(MultipartFile image, String userEmail) throws IOException;

  List<UsernameWithTotalSolvedDto> findAllWithTotalAcceptedSubmissions();

}
