package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.dto.UsernameWithTotalSolvedDto;
import mk.ukim.finki.problem_solving.model.resBody.UserAvatarResBody;
import mk.ukim.finki.problem_solving.service.UserService;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/user/upload-avatar")
    public UserAvatarResBody uploadAvatar(@RequestPart("file") MultipartFile file, @RequestParam("email") String email) throws IOException {
        return new UserAvatarResBody(this.userService.updateAvatar(file, email));
    }

    @GetMapping("/users-with-total-accepted")
    List<UsernameWithTotalSolvedDto> usersWithTotalSolved() {
        return userService.findAllWithTotalAcceptedSubmissions();
    }
}
