package mk.ukim.finki.problem_solving.model.reqBody;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Collection;

@Data
@NoArgsConstructor
public class ProblemsByCategoriesReqBody {
    private Collection<String> categories;

}
