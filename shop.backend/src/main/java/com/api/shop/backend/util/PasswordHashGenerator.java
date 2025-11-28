package com.api.shop.backend.util;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordHashGenerator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String password = "admin123";
        String hash = encoder.encode(password);

        System.out.println("Password: " + password);
        System.out.println("BCrypt Hash: " + hash);
        System.out.println("\nSQL to insert admin user:");
        System.out.println("INSERT INTO users (email, password_hash, name, role, created_at)");
        System.out.println("VALUES ('admin@molly.com', '" + hash + "', 'Admin', 'ADMIN', NOW());");
    }
}
