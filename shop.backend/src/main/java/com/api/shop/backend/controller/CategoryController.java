package com.api.shop.backend.controller;

import com.api.shop.backend.model.Category;
import com.api.shop.backend.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/categories")

public class CategoryController {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    @GetMapping("/{id}/subcategories")
    public List<Category> getSubCategories(@PathVariable Long id) {
        Category parent = categoryRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Category not found"));
        return parent.getSubCategories();
    }
}
