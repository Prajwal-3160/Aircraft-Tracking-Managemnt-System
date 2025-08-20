package com.example.aircraft.service;

import com.example.aircraft.model.ContactMessage;

import java.util.List;

public interface ContactService {
    ContactMessage saveMessage(ContactMessage message);
    List<ContactMessage> getAllMessages();
}
