package com.api.shop.backend.controller;

import com.api.shop.backend.model.Favorite;
import com.api.shop.backend.model.Product;
import com.api.shop.backend.model.User;
import com.api.shop.backend.repository.UserRepository;
import com.api.shop.backend.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/favorites")

public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    @Autowired
    private UserRepository userRepository;

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    @GetMapping
    public ResponseEntity<List<Product>> getFavorites() {
        Long userId = getCurrentUserId();
        List<Product> favorites = favoriteService.getFavorites(userId);
        return ResponseEntity.ok(favorites);
    }

    @PostMapping("/{productId}")
    public ResponseEntity<Favorite> addToFavorites(@PathVariable Long productId) {
        Long userId = getCurrentUserId();
        Favorite favorite = favoriteService.addToFavorites(userId, productId);
        return ResponseEntity.ok(favorite);
    }

    @DeleteMapping("/{productId}")
    public ResponseEntity<Void> removeFromFavorites(@PathVariable Long productId) {
        Long userId = getCurrentUserId();
        favoriteService.removeFromFavorites(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{productId}/check")
    public ResponseEntity<Map<String, Boolean>> isFavorite(@PathVariable Long productId) {
        Long userId = getCurrentUserId();
        boolean isFavorite = favoriteService.isFavorite(userId, productId);
        return ResponseEntity.ok(Map.of("isFavorite", isFavorite));
    }

    @GetMapping("/count")
    public ResponseEntity<Map<String, Integer>> getFavoriteCount() {
        Long userId = getCurrentUserId();
        int count = favoriteService.getFavoriteCount(userId);
        return ResponseEntity.ok(Map.of("count", count));
    }

    @GetMapping("/ids")
    public ResponseEntity<List<Long>> getFavoriteProductIds() {
        Long userId = getCurrentUserId();
        List<Long> ids = favoriteService.getFavorites(userId)
                .stream()
                .map(Product::getId)
                .toList();
        return ResponseEntity.ok(ids);
    }
}
