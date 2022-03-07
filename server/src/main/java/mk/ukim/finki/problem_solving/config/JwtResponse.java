package mk.ukim.finki.problem_solving.config;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class JwtResponse {
    private String jwttoken;
    private String email;
    private String avatarImage;
}
