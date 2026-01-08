package com.api.shop.backend.controller;

import com.api.shop.backend.model.CartItem;
import com.api.shop.backend.model.User;
import com.api.shop.backend.service.CartService;
import com.api.shop.backend.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/payment")

public class PaymentController {

    private final StripeService stripeService;
    private final CartService cartService;

    @Value("${stripe.publishable.key}")
    private String stripePublishableKey;

    public PaymentController(StripeService stripeService, CartService cartService) {
        this.stripeService = stripeService;
        this.cartService = cartService;
    }

    @GetMapping("/config")
    public ResponseEntity<Map<String, String>> getConfig() {
        Map<String, String> response = new HashMap<>();
        response.put("publishableKey", stripePublishableKey);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/create-intent")
    public ResponseEntity<Map<String, String>> createPaymentIntent(@AuthenticationPrincipal User user) {
        try {
            // Fix: Use getCartItems(userId) instead of getCart(user)
            List<CartItem> cartItems = cartService.getCartItems(user.getId());
            if (cartItems.isEmpty()) {
                throw new RuntimeException("Cart is empty");
            }

            // Fix: Use BigDecimal for price calculation
            double total = cartItems.stream()
                    .mapToDouble(item -> item.getProduct().getPrice()
                            .multiply(BigDecimal.valueOf(item.getQuantity()))
                            .doubleValue())
                    .sum();

            // Shipping logic
            if (total < 50)
                total += 4.99;

            long amountInCents = (long) (total * 100);

            PaymentIntent intent = stripeService.createPaymentIntent(amountInCents, "eur");

            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", intent.getClientSecret());
            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
