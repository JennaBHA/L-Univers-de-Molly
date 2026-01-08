package com.api.shop.backend.config;

import org.flywaydb.core.Flyway;
import org.springframework.boot.autoconfigure.flyway.FlywayMigrationStrategy;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlywayConfig {

    @Bean
    public FlywayMigrationStrategy repairStrategy() {
        return flyway -> {
            System.out.println("🛠️ Running Flyway repair...");
            flyway.repair();
            System.out.println("🚀 Running Flyway migrate...");
            flyway.migrate();
        };
    }
}
