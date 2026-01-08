package com.api.shop.backend.controller;

import com.api.shop.backend.model.Animal;
import com.api.shop.backend.repository.AnimalRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/animals")

public class AnimalController {

    private final AnimalRepository animalRepository;

    @Autowired
    public AnimalController(AnimalRepository animalRepository) {
        this.animalRepository = animalRepository;
    }

    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }
}
