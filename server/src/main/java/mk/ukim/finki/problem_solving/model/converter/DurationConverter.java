package mk.ukim.finki.problem_solving.model.converter;

import mk.ukim.finki.problem_solving.model.object.Duration;
import org.neo4j.driver.Value;
import org.neo4j.driver.Values;
import org.springframework.data.neo4j.core.convert.Neo4jPersistentPropertyConverter;
import org.springframework.stereotype.Component;

import javax.validation.constraints.NotNull;
import java.text.ParseException;

@Component
public class DurationConverter implements Neo4jPersistentPropertyConverter<Duration> {
  @Override
  public Value write(@NotNull Duration source) {
    return Values.value(source.toString());
  }

  @Override
  public Duration read(Value source) {
    try {
      return new Duration(source.asString());
    } catch (ParseException e) {
      return null;
    }
  }
}
