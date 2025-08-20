package com.example.aircraft.service;

import com.example.aircraft.model.ContactMessage;
import com.example.aircraft.repository.ContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactServiceImpl implements ContactService {

    @Autowired
    private ContactRepository contactRepository;

    @Override
    public ContactMessage saveMessage(ContactMessage message) {
        return contactRepository.save(message);
    }

    @Override
    public List<ContactMessage> getAllMessages() {
        return contactRepository.findAll();
    }
}
