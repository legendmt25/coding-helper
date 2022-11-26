package mk.ukim.finki.problem_solving.mappers;

import mk.ukim.finki.problem_solving.model.dto.ContestDto;
import mk.ukim.finki.problem_solving.model.object.Contest;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ContestMapper {
  ContestMapper MAPPER = Mappers.getMapper(ContestMapper.class);

  ContestDto toDto(Contest contest);
}
