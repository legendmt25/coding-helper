package mk.ukim.finki.coding_helper.core.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.coding_helper.core.exceptions.InvalidFileException;
import mk.ukim.finki.coding_helper.core.exceptions.UserAlreadyExistsException;
import mk.ukim.finki.coding_helper.core.exceptions.UserNotFoundException;
import mk.ukim.finki.coding_helper.core.service.UserService;
import mk.ukim.finki.coding_helper.integration.dto.UsernameWithTotalSolvedDto;
import mk.ukim.finki.coding_helper.integration.model.RegisterModel;
import mk.ukim.finki.coding_helper.integration.model.User;
import mk.ukim.finki.coding_helper.integration.queries.UserWithTotalSolvedQuery;
import mk.ukim.finki.coding_helper.integration.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;


  @Override
  public List<User> findAll() {
    return userRepository.findAll();
  }

  public User findByEmail(String email) {
    return this.userRepository.findById(email).orElseThrow(() -> new UserNotFoundException(email));
  }

  @Override
  public void register(RegisterModel registerModel) {
    if (this.userRepository.findById(registerModel.getEmail()).isPresent()) {
      throw new UserAlreadyExistsException(registerModel.getEmail());
    }

    User user = new User();
    user.setFirstName(registerModel.getFirstName());
    user.setLastName(registerModel.getLastName());
    user.setGender(registerModel.getGender());
    user.setUsername(registerModel.getUsername());
    user.setEmail(registerModel.getEmail());
    user.setPassword(passwordEncoder.encode(registerModel.getPassword()));
    user.setBirthday(registerModel.getBirthday());
    this.userRepository.save(user);
  }

  @Override
  public String updateAvatar(MultipartFile image, String userEmail) throws IOException {
    if (image == null)
      throw new InvalidFileException();
    var user = this.findByEmail(userEmail);
    var dir = new File("src/main/resources/public/avatars/");
    dir.mkdirs();
    List.of(dir.listFiles(file -> file.getName().startsWith(userEmail + "-avatar"))).forEach(File::delete);
    var fileName = userEmail + "-avatar" + image.getOriginalFilename().substring(image.getOriginalFilename().lastIndexOf("."));
    image.transferTo(Path.of(dir.getPath(), fileName));
    user.setAvatarImage(fileName);
    this.userRepository.save(user);
    return fileName;
  }

  @Override
  public List<UsernameWithTotalSolvedDto> findAllWithTotalAcceptedSubmissions() {
    Function<UserWithTotalSolvedQuery, UsernameWithTotalSolvedDto> function =
        x -> new UsernameWithTotalSolvedDto(x.getUser().getUserName(), x.getSolved());
    return userRepository.findAllWithTotalAcceptedSubmissions()
        .stream()
        .map(function)
        .collect(Collectors.toList());
  }

}
