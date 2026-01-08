package com.api.shop.backend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        
        System.out.println("=== JWT Filter Debug ===");
        System.out.println("🔍 Request URI: " + request.getRequestURI());
        System.out.println("🔍 Request Method: " + request.getMethod());
        
        try {
            String jwt = parseJwt(request);
            System.out.println("🔍 JWT Token present: " + (jwt != null));
            
            if (jwt != null) {
                System.out.println("🔍 JWT Token (first 20 chars): " + jwt.substring(0, Math.min(20, jwt.length())) + "...");
                
                boolean isValid = jwtUtils.validateJwtToken(jwt);
                System.out.println("🔍 JWT Token valid: " + isValid);
                
                if (isValid) {
                    String username = jwtUtils.getUserNameFromJwtToken(jwt);
                    System.out.println("✅ Username from token: " + username);

                    UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                    System.out.println("✅ UserDetails loaded: " + userDetails.getUsername());
                    System.out.println("✅ Authorities: " + userDetails.getAuthorities());
                    
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                    System.out.println("Authentication set in SecurityContext");
                } else {
                    System.out.println("JWT Token validation failed");
                }
            } else {
                System.out.println("No JWT Token found in request");
            }
        } catch (Exception e) {
            System.err.println("Cannot set user authentication: " + e.getMessage());
            e.printStackTrace();
        }

        System.out.println("======================\n");
        filterChain.doFilter(request, response);
    }

    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");
        
        System.out.println("Authorization Header: " + headerAuth);

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
    }
}