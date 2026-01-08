package com.api.shop.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.email.enabled:false}")
    private boolean emailEnabled;

    @Value("${spring.mail.from:noreply@shop.com}")
    private String fromEmail;

    public EmailService(
            @org.springframework.beans.factory.annotation.Autowired(required = false) JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendOrderConfirmation(String to, Long orderId, Double total) {
        if (!emailEnabled || mailSender == null) {
            System.out.println("--- SIMULATED EMAIL (Service disabled or unconfigured) ---");
            System.out.println("To: " + to);
            System.out.println("Subject: Confirmation de commande #" + orderId);
            System.out.println("Body: Merci pour votre commande d'un montant de " + total + "€.");
            System.out.println("-----------------------");
            return;
        }

        try {
            System.out.println("Attempting to send email to: " + to + " with sender: " + fromEmail);
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(to);
            message.setSubject("Confirmation de commande #" + orderId);
            message.setText("Bonjour,\n\nMerci pour votre commande sur L'Univers de Molly.\n" +
                    "Votre commande #" + orderId + " a été confirmée pour un montant de " + total + "€.\n\n" +
                    "Cordialement,\nL'équipe L'Univers de Molly");

            mailSender.send(message);
            System.out.println("Email sent successfully!");
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
            e.printStackTrace();
        }
    }
}
