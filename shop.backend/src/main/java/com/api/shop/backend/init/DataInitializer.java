package com.api.shop.backend.init;

import com.api.shop.backend.model.User;
import com.api.shop.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.findByEmail("admin@admin.com").isEmpty()) {
            User admin = new User();
            admin.setEmail("admin@admin.com");
            admin.setPasswordHash(passwordEncoder.encode("password123"));
            admin.setRole(User.Role.ADMIN);
            admin.setFirstName("Admin");
            admin.setLastName("User");
            admin.setPhone("0000000000");
            userRepository.save(admin);
            System.out.println("Admin user created: admin@admin.com / password123");
        }
    }
}
