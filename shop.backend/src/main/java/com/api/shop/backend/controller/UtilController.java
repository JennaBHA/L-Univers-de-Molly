package com.api.shop.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/util")
public class UtilController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/hash-password")
    public String hashPassword(@RequestParam String password) {
        String hash = passwordEncoder.encode(password);
        return "Password: " + password + "\nBCrypt Hash: " + hash +
                "\n\nSQL:\nUPDATE users SET password_hash = '" + hash + "' WHERE email = 'admin@molly.com';";
    }
}
