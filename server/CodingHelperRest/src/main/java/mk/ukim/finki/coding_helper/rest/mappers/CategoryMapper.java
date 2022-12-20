package mk.ukim.finki.coding_helper.rest.mappers;

import mk.ukim.finki.coding_helper.rest.model.Category;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper
public interface CategoryMapper {

  Category convertCategory(mk.ukim.finki.coding_helper.integration.model.Category category);

  mk.ukim.finki.coding_helper.integration.model.Category convertCategory(Category category);

  List<Category> convertListOfCategoryToRest(List<mk.ukim.finki.coding_helper.integration.model.Category> categories);

  List<mk.ukim.finki.coding_helper.integration.model.Category> convertListOfCategory(List<Category> categories);


}
