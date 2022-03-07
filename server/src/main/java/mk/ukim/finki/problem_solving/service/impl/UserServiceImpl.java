package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.exceptions.InvalidFileException;
import mk.ukim.finki.problem_solving.model.exceptions.UserAlreadyExistsException;
import mk.ukim.finki.problem_solving.model.input.UserInput;
import mk.ukim.finki.problem_solving.model.object.User;
import mk.ukim.finki.problem_solving.model.exceptions.UserNotFoundException;
import mk.ukim.finki.problem_solving.repository.UserRepository;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

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
    public boolean updateAvatar(MultipartFile image, String userEmail) throws IOException {
        if (image == null) {
            throw new InvalidFileException();
        }
        var user = this.findByEmail(userEmail);
        var path = System.getProperty("user.dir") + "/src/main/resources/public/";
        var relativePath = "avatars/" + userEmail + image.getOriginalFilename().substring(image.getOriginalFilename().lastIndexOf("."));
        image.transferTo(new File(path + relativePath));
        user.setAvatarImage(relativePath);
        this.userRepository.save(user);
        return true;
    }
}
