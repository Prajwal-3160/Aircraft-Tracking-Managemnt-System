package com.example.aircraft.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")  
@RestController
public class AboutController {

    @GetMapping("/api/about")
    public String getAboutInfo() {
        return "Flight model details as per other aeroplane blogs referring.";
    }
}
