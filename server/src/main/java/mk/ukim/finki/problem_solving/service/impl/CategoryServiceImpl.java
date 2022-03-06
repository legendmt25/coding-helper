package mk.ukim.finki.problem_solving.service.impl;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.object.Category;
import mk.ukim.finki.problem_solving.model.input.CategoryInput;
import mk.ukim.finki.problem_solving.model.exceptions.CategoryNotFoundException;
import mk.ukim.finki.problem_solving.repository.CategoryRepository;
import mk.ukim.finki.problem_solving.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class  CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    @Override
    public List<Category> findALl() {
        return this.categoryRepository.findAll();
    }

    @Override
    public Category findById(String id) {
        return this.categoryRepository.findById(id).orElseThrow(() -> new CategoryNotFoundException(id));
    }

    @Override
    public Category create(CategoryInput categoryInput) {
        return categoryRepository.save(
                new Category(
                        categoryInput.getName()
                )
        );
    }
}
