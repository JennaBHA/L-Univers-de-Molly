package com.api.shop.backend.controller;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.api.shop.backend.model.CartItem;
import com.api.shop.backend.model.User;
import com.api.shop.backend.repository.UserRepository;
import com.api.shop.backend.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")

public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/test")
    public String test() {
        return "CA MARCHE !";
    }

    @GetMapping("/test-auth")
    public ResponseEntity<String> testAuth() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return ResponseEntity.ok("AUTH OK - User: " + auth.getName());
    }

    private Long getCurrentUserId() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String email = auth.getName();
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return user.getId();
    }

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<List<CartItem>> getCart() {
        Long userId = getCurrentUserId();
        List<CartItem> items = cartService.getCartItems(userId);
        return ResponseEntity.ok(items);
    }

    @PostMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CartItem> addToCart(@RequestBody Map<String, Object> request) {
        Long userId = getCurrentUserId();
        Long productId = Long.valueOf(request.get("productId").toString());
        Integer quantity = request.get("quantity") != null
                ? Integer.valueOf(request.get("quantity").toString())
                : 1;

        CartItem item = cartService.addToCart(userId, productId, quantity);
        return ResponseEntity.ok(item);
    }

    @PutMapping("/{productId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<CartItem> updateQuantity(
            @PathVariable Long productId,
            @RequestBody Map<String, Integer> request) {
        Long userId = getCurrentUserId();
        Integer quantity = request.get("quantity");

        CartItem item = cartService.updateQuantity(userId, productId, quantity);
        if (item == null) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(item);
    }

    @DeleteMapping("/{productId}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> removeFromCart(@PathVariable Long productId) {
        Long userId = getCurrentUserId();
        cartService.removeFromCart(userId, productId);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Void> clearCart() {
        Long userId = getCurrentUserId();
        cartService.clearCart(userId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/count")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Integer>> getCartCount() {
        Long userId = getCurrentUserId();
        int count = cartService.getCartItemCount(userId);
        return ResponseEntity.ok(Map.of("count", count));
    }
}
