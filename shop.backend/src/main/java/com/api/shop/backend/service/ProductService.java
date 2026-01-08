package com.api.shop.backend.service;

import com.api.shop.backend.dto.CreateProductRequest;
import com.api.shop.backend.model.Category;
import com.api.shop.backend.model.Product;
import com.api.shop.backend.repository.CategoryRepository;
import com.api.shop.backend.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final com.api.shop.backend.repository.AnimalRepository animalRepository;

    @Autowired
    public ProductService(ProductRepository productRepository,
            CategoryRepository categoryRepository,
            com.api.shop.backend.repository.AnimalRepository animalRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
        this.animalRepository = animalRepository;
    }

    public List<Product> searchProducts(String search) {
    if (search == null || search.trim().isEmpty()) {
        return getAllProducts(null, null);
    }
    return productRepository.searchProducts(search);
}

    public List<Product> getAllProducts(Long categoryId, Long animalId) {
        org.springframework.data.jpa.domain.Specification<Product> spec = (root, query, cb) -> {
            java.util.List<jakarta.persistence.criteria.Predicate> predicates = new java.util.ArrayList<>();

            if (categoryId != null) {
                jakarta.persistence.criteria.Join<Product, Category> categoryJoin = root.join("category",
                        jakarta.persistence.criteria.JoinType.LEFT);
                jakarta.persistence.criteria.Join<Category, Category> parentJoin = categoryJoin.join("parent",
                        jakarta.persistence.criteria.JoinType.LEFT);

                predicates.add(cb.or(
                        cb.equal(categoryJoin.get("id"), categoryId),
                        cb.equal(parentJoin.get("id"), categoryId)));
            }

            if (animalId != null) {
                predicates.add(cb.equal(root.get("animal").get("id"), animalId));
            }

            return cb.and(predicates.toArray(new jakarta.persistence.criteria.Predicate[0]));
        };

        return productRepository.findAll(spec);
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public Product createProduct(CreateProductRequest request) {
        // Find category
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Create new product
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setDescriptif(request.getDescriptif());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(category);

        if (request.getAnimalId() != null) {
            com.api.shop.backend.model.Animal animal = animalRepository.findById(request.getAnimalId())
                    .orElseThrow(() -> new RuntimeException("Animal not found"));
            product.setAnimal(animal);
        }

        return productRepository.save(product);
    }

    public Product updateProduct(Long id, CreateProductRequest request) {
        Product product = getProductById(id);

        // Find category if changed
        Category category = categoryRepository.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Category not found"));

        // Update fields
        // Update fields
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setDescriptif(request.getDescriptif());
        product.setPrice(request.getPrice());
        product.setStock(request.getStock());
        product.setImageUrl(request.getImageUrl());
        product.setCategory(category);

        if (request.getAnimalId() != null) {
            com.api.shop.backend.model.Animal animal = animalRepository.findById(request.getAnimalId())
                    .orElseThrow(() -> new RuntimeException("Animal not found"));
            product.setAnimal(animal);
        } else {
            product.setAnimal(null);
        }

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}