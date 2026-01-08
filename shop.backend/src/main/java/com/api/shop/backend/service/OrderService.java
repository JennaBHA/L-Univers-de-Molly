package com.api.shop.backend.service;

import com.api.shop.backend.model.*;
import com.api.shop.backend.repository.AddressRepository;
import com.api.shop.backend.repository.OrderRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final AddressRepository addressRepository;
    private final CartService cartService;
    private final EmailService emailService;

    public OrderService(OrderRepository orderRepository, AddressRepository addressRepository, CartService cartService,
            EmailService emailService) {
        this.orderRepository = orderRepository;
        this.addressRepository = addressRepository;
        this.cartService = cartService;
        this.emailService = emailService;
    }

    @Transactional
    public Order createOrder(User user, Address shippingAddress, String paymentMethodId) {
        // 1. Get Cart Items
        List<CartItem> cartItems = cartService.getCartItems(user.getId());
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        // 2. Save Address
        Address savedAddress = addressRepository.save(shippingAddress);

        // 3. Create Order
        Order order = new Order();
        order.setUser(user);
        order.setAddress(savedAddress);
        order.setOrderDate(LocalDateTime.now());
        order.setStatus("PAID");
        order.setPaymentId(paymentMethodId);

        // 4. Create OrderItems
        List<OrderItem> orderItems = new ArrayList<>();
        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cartItems) {
            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(cartItem.getProduct());
            orderItem.setQuantity(cartItem.getQuantity());
            orderItem.setUnitPrice(cartItem.getProduct().getPrice());

            orderItems.add(orderItem);

            // total += price * quantity
            total = total.add(cartItem.getProduct().getPrice().multiply(BigDecimal.valueOf(cartItem.getQuantity())));
        }

        // Add shipping if < 50
        if (total.compareTo(BigDecimal.valueOf(50)) < 0) {
            total = total.add(BigDecimal.valueOf(4.99));
        }

        order.setItems(orderItems);
        order.setTotal(total);

        // 5. Save Order
        Order savedOrder = orderRepository.save(order);

        // 6. Clear Cart
        cartService.clearCart(user.getId());

        // 7. Send Email
        emailService.sendOrderConfirmation(user.getEmail(), savedOrder.getId(), savedOrder.getTotal().doubleValue());

        return savedOrder;
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository.findByUserOrderByOrderDateDesc(user);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAllByOrderByOrderDateDesc();
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id).orElseThrow(() -> new RuntimeException("Order not found"));
    }

    public Order updateStatus(Long id, String status) {
        Order order = getOrderById(id);
        order.setStatus(status);
        return orderRepository.save(order);
    }
}
