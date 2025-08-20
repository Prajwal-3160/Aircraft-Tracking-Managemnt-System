package com.example.aircraft.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "admin_dashboard")
public class AdminDashboard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate date;

    private int totalUsers;
    private int totalBookings;
    private int activeFlights;
    private String adminNote;

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getTotalUsers() {
        return totalUsers;
    }

    public void setTotalUsers(int totalUsers) {
        this.totalUsers = totalUsers;
    }

    public int getTotalBookings() {
        return totalBookings;
    }

    public void setTotalBookings(int totalBookings) {
        this.totalBookings = totalBookings;
    }

    public int getActiveFlights() {
        return activeFlights;
    }

    public void setActiveFlights(int activeFlights) {
        this.activeFlights = activeFlights;
    }

    public String getAdminNote() {
        return adminNote;
    }

    public void setAdminNote(String adminNote) {
        this.adminNote = adminNote;
    }
}
