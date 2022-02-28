package mk.ukim.finki.problem_solving.service.impl;

import mk.ukim.finki.problem_solving.model.Category;
import mk.ukim.finki.problem_solving.repository.CategoryRepository;
import mk.ukim.finki.problem_solving.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findALl() {
        return this.categoryRepository.findAll();
    }
}
