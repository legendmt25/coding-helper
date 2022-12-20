package mk.ukim.finki.coding_helper.core.service;

import mk.ukim.finki.coding_helper.integration.model.Category;

import java.util.List;

public interface CategoryService {
  List<Category> findALl();

  Category findById(String name);

  void create(Category category);
}
