package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.object.Category;
import mk.ukim.finki.problem_solving.model.input.CategoryInput;

import java.util.List;

public interface CategoryService {
    List<Category> findALl();

    Category findById(String name);

    Category create(CategoryInput categoryInput);
}
