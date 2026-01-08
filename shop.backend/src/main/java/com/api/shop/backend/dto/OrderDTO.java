package com.api.shop.backend.dto;

import lombok.Data;

import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private String orderDate;
    private Double total;
    private String status;
    private AddressDTO shippingAddress;
    private List<OrderItemDTO> items;
    private String customerName;
    private String customerEmail;

    @Data
    public static class AddressDTO {
        private String street;
        private String city;
        private String postalCode;
        private String country;
    }

    @Data
    public static class OrderItemDTO {
        private String productName;
        private int quantity;
        private Double price;
        private String imageUrl;
    }
}
