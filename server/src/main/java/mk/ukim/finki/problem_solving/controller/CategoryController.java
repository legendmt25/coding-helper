package mk.ukim.finki.problem_solving.controller;

import lombok.AllArgsConstructor;
import mk.ukim.finki.problem_solving.model.input.CategoryInput;
import mk.ukim.finki.problem_solving.model.object.Category;
import mk.ukim.finki.problem_solving.service.CategoryService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/api")
@RestController
@AllArgsConstructor
public class CategoryController {
    private final CategoryService categoryService;

    @GetMapping("/categories")
    ResponseEntity<List<Category>> getAllCategories() {
        return ResponseEntity.ok().body(this.categoryService.findALl());
    }

    @PostMapping("/category/create")
    Category create(@RequestBody CategoryInput categoryInput) {
        return this.categoryService.create(categoryInput);
    }

}
