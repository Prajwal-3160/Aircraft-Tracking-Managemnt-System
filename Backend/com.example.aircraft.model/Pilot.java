package com.example.aircraft.model;

import jakarta.persistence.*;

@Entity
public class Pilot {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String experience;
    private String licenseNumber;

    // Constructors
    public Pilot() {}

    public Pilot(Long id, String name, String experience, String licenseNumber) {
        this.id = id;
        this.setName(name);
        this.setExperience(experience);
        this.setLicenseNumber(licenseNumber);
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getLicenseNumber() {
		return licenseNumber;
	}

	public void setLicenseNumber(String licenseNumber) {
		this.licenseNumber = licenseNumber;
	}

	@Override
	public String toString() {
		return "Pilot [id=" + id + ", name=" + name + ", experience=" + experience + ", licenseNumber=" + licenseNumber
				+ "]";
	}

   
}
