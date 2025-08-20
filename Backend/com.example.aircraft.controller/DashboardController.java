package com.example.aircraft.controller;

import com.example.aircraft.model.AdminDashboard;
import com.example.aircraft.service.AdminDashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private AdminDashboardService service;

    @PostMapping("/save")
    public AdminDashboard saveDashboard(@RequestBody AdminDashboard dashboard) {
        return service.saveDashboard(dashboard);
    }

    @GetMapping("/all")
    public List<AdminDashboard> getAllDashboards() {
        return service.getAllDashboards();
    }

    @PutMapping("/update")
    public AdminDashboard updateDashboard(@RequestBody AdminDashboard dashboard) {
        return service.updateDashboard(dashboard);
    }
}
