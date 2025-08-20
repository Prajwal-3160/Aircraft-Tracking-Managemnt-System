package com.example.aircraft.service;

import com.example.aircraft.model.AdminDashboard;
import com.example.aircraft.repository.AdminDashboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminDashboardService {

    @Autowired
    private AdminDashboardRepository repository;

    public AdminDashboard saveDashboard(AdminDashboard dashboard) {
        return repository.save(dashboard);
    }

    public List<AdminDashboard> getAllDashboards() {
        return repository.findAll();
    }

    public AdminDashboard updateDashboard(AdminDashboard dashboard) {
        return repository.save(dashboard);
    }
}
