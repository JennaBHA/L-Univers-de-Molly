package com.api.shop.backend.controller;

import com.api.shop.backend.dto.CheckoutRequest;
import com.api.shop.backend.dto.OrderDTO;
import com.api.shop.backend.model.Order;
import com.api.shop.backend.model.User;
import com.api.shop.backend.service.OrderService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/orders")

public class OrderController {

    private final OrderService orderService;

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public ResponseEntity<?> checkout(@AuthenticationPrincipal User user, @RequestBody CheckoutRequest request) {
        try {
            Order order = orderService.createOrder(user, request.toAddress(), request.getPaymentMethodId());
            return ResponseEntity.ok(Map.of("success", true, "orderId", order.getId()));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("success", false, "error", e.getMessage()));
        }
    }

    @GetMapping
    public List<OrderDTO> getMyOrders(@AuthenticationPrincipal User user) {
        return orderService.getUserOrders(user).stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/all")
    @PreAuthorize("hasRole('ADMIN')")
    public List<OrderDTO> getAllOrders() {
        return orderService.getAllOrders().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public OrderDTO updateStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Order order = orderService.updateStatus(id, payload.get("status"));
        return convertToDTO(order);
    }

    private OrderDTO convertToDTO(Order order) {
        OrderDTO dto = new OrderDTO();
        dto.setId(order.getId());
        dto.setOrderDate(order.getOrderDate().toString());
        dto.setTotal(order.getTotal().doubleValue());
        dto.setStatus(order.getStatus());
        dto.setCustomerName(order.getUser().getFirstName() + " " + order.getUser().getLastName());
        dto.setCustomerEmail(order.getUser().getEmail());

        OrderDTO.AddressDTO addressDTO = new OrderDTO.AddressDTO();
        if (order.getAddress() != null) {
            addressDTO.setStreet(order.getAddress().getStreet());
            addressDTO.setCity(order.getAddress().getCity());
            addressDTO.setPostalCode(order.getAddress().getPostalCode());
            addressDTO.setCountry(order.getAddress().getCountry());
        }
        dto.setShippingAddress(addressDTO);

        List<OrderDTO.OrderItemDTO> items = order.getItems().stream().map(item -> {
            OrderDTO.OrderItemDTO itemDTO = new OrderDTO.OrderItemDTO();
            itemDTO.setProductName(item.getProduct().getName());
            itemDTO.setQuantity(item.getQuantity());
            itemDTO.setPrice(item.getUnitPrice().doubleValue());
            itemDTO.setImageUrl(item.getProduct().getImageUrl());
            return itemDTO;
        }).collect(Collectors.toList());
        dto.setItems(items);

        return dto;
    }
}
