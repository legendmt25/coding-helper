package mk.ukim.finki.coding_helper.rest.controller;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.coding_helper.core.service.CategoryService;
import mk.ukim.finki.coding_helper.rest.api.CategoriesApi;
import mk.ukim.finki.coding_helper.rest.mappers.CategoryMapper;
import mk.ukim.finki.coding_helper.rest.model.Category;
import org.springframework.http.ResponseEntity;

import java.util.List;

@CodingHelperController
@RequiredArgsConstructor
public class CategoryController implements CategoriesApi {
  private final CategoryService categoryService;
  private final CategoryMapper categoryConverter;

  @Override
  public ResponseEntity<List<Category>> getCategories() {
    List<mk.ukim.finki.coding_helper.integration.model.Category> categories = categoryService.findALl();
    List<Category> converted = categoryConverter.convertListOfCategoryToRest(categories);
    return ResponseEntity.ok(converted);
  }

  @Override
  public ResponseEntity<Void> createCategories(Category category) {
    mk.ukim.finki.coding_helper.integration.model.Category converted = categoryConverter.convertCategory(category);
    categoryService.create(converted);
    return ResponseEntity.noContent().build();
  }
}
