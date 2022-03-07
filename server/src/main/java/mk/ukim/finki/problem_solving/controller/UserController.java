package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/user/uploadAvatar")
    public boolean uploadAvatar(@RequestPart("file") MultipartFile file, @RequestParam("email") String email) throws IOException {
        this.userService.updateAvatar(file, email);
        return true;
    }
}
