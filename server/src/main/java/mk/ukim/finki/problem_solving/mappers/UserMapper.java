package mk.ukim.finki.problem_solving.mappers;

import mk.ukim.finki.problem_solving.model.dto.UserDto;
import mk.ukim.finki.problem_solving.model.object.User;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {
  UserMapper MAPPER = Mappers.getMapper(UserMapper.class);

  UserDto toDto(User user);
}
