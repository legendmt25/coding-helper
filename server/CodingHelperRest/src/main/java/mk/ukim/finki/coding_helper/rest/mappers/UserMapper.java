package mk.ukim.finki.coding_helper.rest.mappers;

import mk.ukim.finki.coding_helper.integration.model.LoginModel;
import mk.ukim.finki.coding_helper.integration.model.RegisterModel;
import mk.ukim.finki.coding_helper.rest.model.LoginRequest;
import mk.ukim.finki.coding_helper.rest.model.RegisterRequest;
import mk.ukim.finki.coding_helper.rest.model.UsernameWithTotalSolvedDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {

  RegisterModel convertRegisterRequest(RegisterRequest registerRequest);
  LoginModel convertLoginRequest(LoginRequest loginRequest);

  UsernameWithTotalSolvedDto convertUsernameWithTotalSolved(
      mk.ukim.finki.coding_helper.integration.dto.UsernameWithTotalSolvedDto dto
  );

  mk.ukim.finki.coding_helper.integration.dto.UsernameWithTotalSolvedDto convertUsernameWithTotalSolved(
      UsernameWithTotalSolvedDto dto
  );

  List<mk.ukim.finki.coding_helper.integration.dto.UsernameWithTotalSolvedDto> convertListOfUsernameWithTotalSolved(
      List<UsernameWithTotalSolvedDto> usernameWithTotalSolvedDtos
  );

  List<UsernameWithTotalSolvedDto> convertListOfUsernameWithTotalSolvedToRest(
      List<mk.ukim.finki.coding_helper.integration.dto.UsernameWithTotalSolvedDto> usernameWithTotalSolvedDtos
  );


  //UserDto toDto(User user);
}
