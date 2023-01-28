package mk.ukim.finki.coding_helper.rest.mappers;

import mk.ukim.finki.coding_helper.rest.model.Difficulty;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface DifficultyMapper {

  Difficulty convertDifficulty(mk.ukim.finki.coding_helper.integration.enums.Difficulty difficulty);

  mk.ukim.finki.coding_helper.integration.enums.Difficulty convertDifficulty(Difficulty difficulty);

  List<Difficulty> convertListOfDifficultyToRest(List<mk.ukim.finki.coding_helper.integration.enums.Difficulty> difficulties);

  List<mk.ukim.finki.coding_helper.integration.enums.Difficulty> convertListOfDifficulty(List<Difficulty> difficulties);

}
