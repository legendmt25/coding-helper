package mk.ukim.finki.problem_solving.service;

import mk.ukim.finki.problem_solving.model.Category;
import mk.ukim.finki.problem_solving.repository.CategoryRepository;

import java.util.List;

public interface CategoryService {
    List<Category> findALl();
}
