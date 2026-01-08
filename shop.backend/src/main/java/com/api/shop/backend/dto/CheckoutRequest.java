package com.api.shop.backend.dto;

import com.api.shop.backend.model.Address;
import lombok.Data;

@Data
public class CheckoutRequest {
    private String street;
    private String city;
    private String state;
    private String postalCode;
    private String country;
    private String paymentMethodId;

    public Address toAddress() {
        Address address = new Address();
        address.setStreet(street);
        address.setCity(city);
        address.setState(state);
        address.setPostalCode(postalCode);
        address.setCountry(country);
        return address;
    }
}
