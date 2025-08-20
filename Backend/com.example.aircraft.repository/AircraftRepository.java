package com.example.aircraft.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.aircraft.model.Aircraft;

public interface AircraftRepository extends JpaRepository<Aircraft, Long> {}