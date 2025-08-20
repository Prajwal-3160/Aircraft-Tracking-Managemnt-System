package com.example.aircraft.service;

import com.example.aircraft.model.Booking;
import java.util.List;

public interface BookingService {
    Booking saveBooking(Booking booking);
    List<Booking> getAllBookings();
}

