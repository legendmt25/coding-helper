package mk.ukim.finki.coding_helper.rest.mappers;

import mk.ukim.finki.coding_helper.integration.model.Problem;
import mk.ukim.finki.coding_helper.integration.queries.ProblemByLikesQuery;
import mk.ukim.finki.coding_helper.rest.model.*;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.core.io.Resource;

import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.List;

@Mapper(uses = {CategoryMapper.class, DifficultyMapper.class})
public interface ProblemMapper {

  @Mappings({
      @Mapping(source = "starterCode", target = ".", qualifiedByName = "convertResource"),
  })
  Problem convertProblem(ProblemRequest problem);


  default String convertResource(Resource resource) throws IOException {
    byte[] data = resource.getInputStream().readAllBytes();
    return new String(data, StandardCharsets.UTF_8);
  }

  ProblemEntry convertProblem(Problem problem);

  List<ProblemEntry> convertListOfProblemToRest(List<Problem> problem);

  ProblemByLikes convertProblemByLikes(ProblemByLikesQuery problem);

  List<ProblemByLikes> convertListOfProblemByLikesToRest(List<ProblemByLikesQuery> problems);

  default ProblemsResponse convertListOfProblemToResponse(List<Problem> problems) {
    List<ProblemEntry> entries = convertListOfProblemToRest(problems);
    return new ProblemsResponse().problems(entries);
  }

  default ProblemsTop10Response convertListOfProblemByLikesToResponse(List<ProblemByLikesQuery> problems) {
    List<ProblemByLikes> entries = convertListOfProblemByLikesToRest(problems);
    return new ProblemsTop10Response().problems(entries);
  }
}
