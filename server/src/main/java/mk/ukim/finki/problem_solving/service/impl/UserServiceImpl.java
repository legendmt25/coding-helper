package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.dto.UsernameWithTotalSolvedDto;
import mk.ukim.finki.problem_solving.model.exceptions.InvalidFileException;
import mk.ukim.finki.problem_solving.model.exceptions.UserAlreadyExistsException;
import mk.ukim.finki.problem_solving.model.exceptions.UserNotFoundException;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import mk.ukim.finki.problem_solving.model.object.User;
import mk.ukim.finki.problem_solving.repository.UserRepository;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.util.List;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public List<User> findAll() {
        return this.userRepository.findAll();
    }

    public User findByEmail(String email) {
        return this.userRepository.findById(email).orElseThrow(() -> new UserNotFoundException(email));
    }

    @Override
    public boolean register(UserInput userInput) {
        if (this.userRepository.findById(userInput.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException(userInput.getEmail());
        }
        userInput.setPassword(passwordEncoder.encode(userInput.getPassword()));
        this.userRepository.save(new User(userInput));
        return true;
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
        return userRepository.findAllWithTotalAcceptedSubmissions().stream().map(x -> new UsernameWithTotalSolvedDto(x.getUser().getUserName(), x.getSolved())).toList();
    }
}
