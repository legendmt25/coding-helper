package mk.ukim.finki.coding_helper.rest.mappers;

import mk.ukim.finki.coding_helper.integration.model.Contest;
import mk.ukim.finki.coding_helper.rest.model.ContestBaseEntry;
import mk.ukim.finki.coding_helper.rest.model.ContestEntry;
import mk.ukim.finki.coding_helper.rest.model.ContestProblem;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface ContestMapper {
  //  ContestDto toDto(Contest contest);
  List<ContestEntry> convertListOfContestModel(List<Contest> contests);

  ContestEntry convertContest(Contest contest);

  ContestProblem convertContestProblem(mk.ukim.finki.coding_helper.integration.model.ContestProblem contestProblem);

  Contest convertContest(Long id, ContestBaseEntry entry);
}
