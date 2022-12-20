package mk.ukim.finki.coding_helper.core.service.impl;

import lombok.RequiredArgsConstructor;
import mk.ukim.finki.coding_helper.core.exceptions.CategoryNotFoundException;
import mk.ukim.finki.coding_helper.core.service.CategoryService;
import mk.ukim.finki.coding_helper.integration.model.Category;
import mk.ukim.finki.coding_helper.integration.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
  private final CategoryRepository categoryRepository;

  @Override
  public List<Category> findALl() {
    return this.categoryRepository.findAll();
  }

  @Override
  public Category findById(String id) {
    return categoryRepository.findById(id)
        .orElseThrow(() -> new CategoryNotFoundException(id));
  }

  @Override
  public void create(Category category) {
    categoryRepository.save(category);
  }
}
