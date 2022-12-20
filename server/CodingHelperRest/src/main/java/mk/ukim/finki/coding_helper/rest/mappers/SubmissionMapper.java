package mk.ukim.finki.coding_helper.rest.mappers;

import mk.ukim.finki.coding_helper.integration.dto.SubmissionDto;
import mk.ukim.finki.coding_helper.rest.model.SubmissionEntry;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface SubmissionMapper {

  //  SubmissionDto toDto(Submission submission);
  List<SubmissionEntry> convertListOfSubmissionModel(List<SubmissionDto> submissions);
}
