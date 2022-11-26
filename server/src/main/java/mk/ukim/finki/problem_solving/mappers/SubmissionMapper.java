package mk.ukim.finki.problem_solving.mappers;

import mk.ukim.finki.problem_solving.model.dto.SubmissionDto;
import mk.ukim.finki.problem_solving.model.object.Submission;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface SubmissionMapper {
  SubmissionMapper MAPPER =Mappers.getMapper(SubmissionMapper.class);

  SubmissionDto toDto(Submission submission);
}
