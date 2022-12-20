package mk.ukim.finki.coding_helper.rest.mappers;

import mk.ukim.finki.coding_helper.integration.model.Problem;
import mk.ukim.finki.coding_helper.integration.queries.ProblemByLikesQuery;
import mk.ukim.finki.coding_helper.rest.model.ProblemByLikes;
import mk.ukim.finki.coding_helper.rest.model.ProblemEntry;
import mk.ukim.finki.coding_helper.rest.model.ProblemRequest;
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

  List<ProblemByLikes> converyListOfProblemByLikesToRest(List<ProblemByLikesQuery> problems);
}
