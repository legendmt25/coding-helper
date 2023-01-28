package mk.ukim.finki.coding_helper.rest.controller.converter;

import mk.ukim.finki.coding_helper.rest.model.Category;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

@Component
public class CategoryConverter implements Converter<String, Category> {
  @Override
  public Category convert(String category) {
    return new Category().name(category);
  }
}
