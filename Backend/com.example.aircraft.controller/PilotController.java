package com.example.aircraft.controller;

import com.example.aircraft.model.Pilot;
import com.example.aircraft.repository.PilotRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/pilots")
public class PilotController {

    private final PilotRepository pilotRepository;

    public PilotController(PilotRepository pilotRepository) {
        this.pilotRepository = pilotRepository;
    }

    @GetMapping
    public List<Pilot> getAllPilots() {
        return pilotRepository.findAll();
    }

    @PostMapping
    public Pilot addPilot(@RequestBody Pilot newPilot) {
        return pilotRepository.save(newPilot);
    }
}
