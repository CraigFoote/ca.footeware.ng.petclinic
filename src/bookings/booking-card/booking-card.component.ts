import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Booking } from '../../model/Booking';

@Component({
    selector: 'app-booking-card',
    imports: [
        MatButtonModule,
        CommonModule,
        MatCardModule
    ],
    templateUrl: './booking-card.component.html',
    styleUrl: './booking-card.component.css'
})
export class BookingCardComponent {

    @Input() bookings: Booking[] = [];
    @Output() editClicked = new EventEmitter<Booking>();

    editBooking(booking: Booking) {
        this.editClicked.emit(booking);
    }

    isCurrentDate(date: Date): boolean {
        const today = new Date();
        // Set hours, minutes, seconds, and milliseconds to 0 for accurate date comparison
        today.setHours(0, 0, 0, 0);
        const bookingDate = new Date(date);
        bookingDate.setHours(0, 0, 0, 0);
        return bookingDate.getTime() === today.getTime();
    }
}
