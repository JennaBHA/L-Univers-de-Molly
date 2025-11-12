package com.api.shop.backend.config;

import org.flywaydb.core.Flyway;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FlywayConfig {

    @Bean
    public CommandLineRunner migrateDatabase() {
        return args -> {
            Flyway.configure()
                    .dataSource("jdbc:mariadb://localhost:3306/shop_db", "root", "")
                    .locations("classpath:db/migration")
                    .baselineOnMigrate(true)
                    .load()
                    .migrate();
            System.out.println("✅ Flyway migrations applied manually");
        };
    }
}
