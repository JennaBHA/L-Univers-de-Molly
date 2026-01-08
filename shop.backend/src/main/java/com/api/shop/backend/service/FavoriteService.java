package com.api.shop.backend.service;

import com.api.shop.backend.model.Favorite;
import com.api.shop.backend.model.Product;
import com.api.shop.backend.model.User;
import com.api.shop.backend.repository.FavoriteRepository;
import com.api.shop.backend.repository.ProductRepository;
import com.api.shop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class FavoriteService {

    @Autowired
    private FavoriteRepository favoriteRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getFavorites(Long userId) {
        return favoriteRepository.findByUserId(userId)
                .stream()
                .map(Favorite::getProduct)
                .collect(Collectors.toList());
    }

    public List<Favorite> getFavoriteItems(Long userId) {
        return favoriteRepository.findByUserId(userId);
    }

    @Transactional
    public Favorite addToFavorites(Long userId, Long productId) {
        // Check if already favorited
        if (favoriteRepository.existsByUserIdAndProductId(userId, productId)) {
            return favoriteRepository.findByUserIdAndProductId(userId, productId).get();
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Favorite favorite = new Favorite(user, product);
        return favoriteRepository.save(favorite);
    }

    @Transactional
    public void removeFromFavorites(Long userId, Long productId) {
        favoriteRepository.deleteByUserIdAndProductId(userId, productId);
    }

    public boolean isFavorite(Long userId, Long productId) {
        return favoriteRepository.existsByUserIdAndProductId(userId, productId);
    }

    public int getFavoriteCount(Long userId) {
        return favoriteRepository.findByUserId(userId).size();
    }
}
