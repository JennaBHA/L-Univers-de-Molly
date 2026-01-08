package com.api.shop.backend.service;

import com.api.shop.backend.dto.JwtResponse;
import com.api.shop.backend.dto.LoginRequest;
import com.api.shop.backend.dto.SignupRequest;
import com.api.shop.backend.model.User;
import com.api.shop.backend.repository.UserRepository;
import com.api.shop.backend.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    JwtUtils jwtUtils;

    public JwtResponse authenticateUser(LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getEmail(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = jwtUtils.generateJwtToken(authentication);

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        User user = userRepository.findByEmail(userDetails.getUsername()).orElseThrow();

        // ✅ MODIFIÉ ICI - Ajout firstName et lastName
        return new JwtResponse(jwt,
                user.getId(),
                user.getEmail(),
                user.getRole().name(),
                user.getFirstName(), // ← AJOUTÉ
                user.getLastName()); // ← AJOUTÉ
    }

    public void registerUser(SignupRequest signUpRequest) {
        if (userRepository.findByEmail(signUpRequest.getEmail()).isPresent()) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // Create new user's account
        User user = new User();
        user.setFirstName(signUpRequest.getFirstName());
        user.setLastName(signUpRequest.getLastName());
        user.setEmail(signUpRequest.getEmail());
        user.setPhone(signUpRequest.getPhone());
        user.setPasswordHash(encoder.encode(signUpRequest.getPassword()));
        user.setRole(User.Role.USER); // Default role

        userRepository.save(user);
    }
}