package com.api.shop.backend.dto;

import lombok.Data;

@Data
public class JwtResponse {
    private String token;
    private String type = "Bearer";
    private Long id;
    private String email;
    private String role;
    private String firstName;
    private String lastName;
    
    // ANCIEN CONSTRUCTEUR (garde-le pour compatibilité)
    public JwtResponse(String accessToken, Long id, String email, String role) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.role = role;
    }

    // NOUVEAU CONSTRUCTEUR (avec firstName et lastName)
    public JwtResponse(String accessToken, Long id, String email, String role, String firstName, String lastName) {
        this.token = accessToken;
        this.id = id;
        this.email = email;
        this.role = role;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}