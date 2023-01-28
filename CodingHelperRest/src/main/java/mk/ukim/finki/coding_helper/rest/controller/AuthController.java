package mk.ukim.finki.coding_helper.rest.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.coding_helper.core.exceptions.InvalidCredentialsException;
import mk.ukim.finki.coding_helper.core.service.AuthService;
import mk.ukim.finki.coding_helper.core.service.UserService;
import mk.ukim.finki.coding_helper.core.service.impl.JwtTokenService;
import mk.ukim.finki.coding_helper.integration.model.RegisterModel;
import mk.ukim.finki.coding_helper.integration.model.User;
import mk.ukim.finki.coding_helper.rest.api.AuthApi;
import mk.ukim.finki.coding_helper.rest.mappers.UserMapper;
import mk.ukim.finki.coding_helper.rest.model.LoginRequest;
import mk.ukim.finki.coding_helper.rest.model.RegisterRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

@CodingHelperController
@RequiredArgsConstructor
public class AuthController implements AuthApi {
  private final AuthenticationManager authenticationManager;
  private final JwtTokenService jwtTokenService;
  private final AuthService authService;
  private final UserService userService;
  private final UserMapper userConverter;


  @Override
  public ResponseEntity<Void> register(RegisterRequest registerRequest) {
    RegisterModel model = userConverter.convertRegisterRequest(registerRequest);
    userService.register(model);
    return ResponseEntity.noContent().build();
  }

  @Override
  public ResponseEntity<String> login(LoginRequest loginRequest) {
    try {
      UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
          loginRequest.getEmail(),
          loginRequest.getPassword()
      );
      authenticationManager.authenticate(authToken);
    } catch (DisabledException | BadCredentialsException e) {
      throw new InvalidCredentialsException();
    }
    User userDetails = authService.loadUserByUsername(loginRequest.getEmail());
    String token = jwtTokenService.generateToken(userDetails);
    return ResponseEntity.ok(token);
  }
}
