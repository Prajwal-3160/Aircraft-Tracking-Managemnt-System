package com.example.aircraft.controller;

import com.example.aircraft.model.ContactMessage;
import com.example.aircraft.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*") 
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private ContactService contactService;

    @PostMapping
    public ContactMessage submitMessage(@RequestBody ContactMessage message) {
        return contactService.saveMessage(message);
    }

    @GetMapping
    public List<ContactMessage> getAllMessages() {
        return contactService.getAllMessages();
    }
}
