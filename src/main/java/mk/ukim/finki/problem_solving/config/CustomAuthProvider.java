package mk.ukim.finki.problem_solving.config;

import mk.ukim.finki.problem_solving.model.exceptions.InvalidCredentialsException;
import mk.ukim.finki.problem_solving.service.AuthService;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class CustomAuthProvider implements AuthenticationProvider {

    private final PasswordEncoder passwordEncoder;
    private final AuthService authService;

    public CustomAuthProvider(PasswordEncoder passwordEncoder, AuthService authService) {
        this.passwordEncoder = passwordEncoder;
        this.authService = authService;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        var email = authentication.getName();
        var password = authentication.getCredentials().toString();

        var user = authService.loadUserByUsername(email);


        if (!this.passwordEncoder.matches(password, user.getPassword())) {
            throw new InvalidCredentialsException();
        }
        return new UsernamePasswordAuthenticationToken(
                authentication.getPrincipal(),
                passwordEncoder.encode(password),
                authentication.getAuthorities()
        );
    }



    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}

