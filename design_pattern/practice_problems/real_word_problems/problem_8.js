/**
 * ==========================================
 * Problem 8: The Movie Theater Booking System
 * ==========================================
 * 
 * ### The Scenario
 * You are building the backend for a Movie Theater. Users can view the seating 
 * chart for a specific movie showing and select seats they want to buy.
 * 
 * When a user selects a seat (e.g., A1), that seat is put on "Hold" for 5 minutes 
 * while they enter their credit card information. During these 5 minutes, NO OTHER 
 * user can select that seat. 
 * 
 * If they successfully pay within 5 minutes, the seat's status becomes "Booked".
 * If they fail to pay within 5 minutes, the seat's status reverts to "Available".
 * 
 * Core Requirements:
 * 1. The system has `Show`s (e.g., "Inception at 7:00 PM").
 * 2. Each Show has a set of `Seat`s.
 * 3. A Seat can be Available, Held, or Booked.
 * 4. You must implement the logic to Hold a seat, Book a seat, and release a Hold.
 * 
 * ### The OOP Challenge (NO DATABASES ALLOWED!)
 * You cannot use a background cron job or a database query to expire holds. 
 * You must manage the exact state of the Seats purely in memory using Object-Oriented 
 * principles. 
 * 
 * ### Your Task
 * Architect the classes and relationships to support this system. 
 * Write the skeleton classes, and prove your architecture works by writing client 
 * code that:
 * 1. Creates a Show with a few Seats.
 * 2. User 1 puts Seat A1 on Hold.
 * 3. User 2 tries to put Seat A1 on Hold (should fail).
 * 4. User 1 successfully books Seat A1.
 */




// Enum for Seat Status
const STATUS = {
    AVAILABLE: 'available',
    HELD: 'held',
    BOOKED: 'booked'
}

class BookingDetails {
    constructor(userName, showName, seatNumber) {
        this.name = userName
        this.showName = showName;
        this.seatNumber = seatNumber;
    }
}

class Show {
    constructor(name, startTime, endTime) {
        this.name = name;
        this.startTime = startTime;
        this.endTime = endTime;
        this.seats = new Map();
    }
    addSeat(seat) {
        this.seats.set(seat.seatNumber, seat);
    }
    getSeat(seatNumber) {
        return this.seats.get(seatNumber);
    }
}

class Seat {
    constructor(seatNumber) {
        this.seatNumber = seatNumber;
        this.status = STATUS.AVAILABLE;
        this.holdExpiry = null;
    }
    holdSeat() {
        // LAZY EVALUATION: If it's HELD, but expired, quietly release it!
        if (this.status === STATUS.HELD && new Date() > this.holdExpiry) {
            this.releaseHold();
        }

        // Now do the normal check
        if (this.status != STATUS.AVAILABLE) {
            return false;
        }

        this.status = STATUS.HELD;
        this.holdExpiry = new Date(Date.now() + 5 * 60 * 1000);
        return true;
    }
    bookSeat() {
        if (this.status != STATUS.HELD || new Date() > this.holdExpiry) {
            return false;
        }
        this.status = STATUS.BOOKED;
        this.holdExpiry = null;
        return true;
    }
    releaseHold() {
        this.status = STATUS.AVAILABLE;
        this.holdExpiry = null;
    }
}

class TicketBooking {
    constructor() {
        this.ticketJourney = { status: STATUS.AVAILABLE, userDetails: null, error: null, message: null };
    }
    booking(show, details) {
        this.ticketJourney.userDetails = details;

        if (show.getSeat(details.seatNumber)) {
            console.log("Holding seat ...",);
            const seatState = show.getSeat("A1").holdSeat()
            if (!seatState) {
                this.ticketJourney.error = "Seat is not available";
                this.ticketJourney.message = "Can not book tickets";
                this.ticketJourney.status = STATUS.AVAILABLE;
                return this.ticketJourney;
            }
            this.ticketJourney.status = STATUS.HELD;
            this.ticketJourney.holdExpiry = new Date(Date.now() + 5 * 60 * 1000);
            console.log("Confirming seat ...")
            const bookState = show.getSeat("A1").bookSeat()
            if (!bookState) {
                this.ticketJourney.error = "Seat is not available";
                this.ticketJourney.message = "Can not book tickets";
                this.ticketJourney.status = STATUS.AVAILABLE;
                return this.ticketJourney;
            }
            this.ticketJourney.status = STATUS.BOOKED;
            this.ticketJourney.holdExpiry = null;
            this.ticketJourney.message = "Seat Booked Successfully";

            return this.ticketJourney

        }
        else {
            this.ticketJourney.error = "Seat not found";
            this.ticketJourney.message = "Can not book tickets";
            this.ticketJourney.status = STATUS.AVAILABLE;
            return this.ticketJourney;
        }

    }
}


// take user booking details like 
const bookingDetails1 = new BookingDetails(
    "Vivek",
    "Inception",
    "A1"
)
const bookingDetails2 = new BookingDetails(
    "Akhil",
    "Inception",
    "A1"
)
console.log("Booking Details", bookingDetails1);

// Now we will create a show with time 
const show = new Show("Inception", new Date(), new Date(Date.now() + 2 * 60 * 60 * 1000));
// Add Seat
show.addSeat(new Seat("A1"));
show.addSeat(new Seat("A2"));

class BookingFacade {
    constructor(show) {
        this.show = show;
        this.ticketBooking = new TicketBooking();
    }
    processBooking(bookingDetails) {
        // Verify User 

        // Tickets booking dedicated class
        const tickets = this.ticketBooking.booking(show, bookingDetails);
        console.log(tickets);

        // Notifications


    }

}

const client1 = new BookingFacade(show).processBooking(bookingDetails1);
const client2 = new BookingFacade(show).processBooking(bookingDetails2);

// console.log("Before Booking", show.getSeat("A1"));
// console.log(show.getSeat("A1").holdSeat());
// console.log("After Hold", show.getSeat("A1"));
// console.log(show.getSeat("A1").bookSeat());
// console.log(show.getSeat("A1").bookSeat());
// console.log("After Booking", show.getSeat("A1"));
// console.log(show.getSeat("A2"));

/*
================================================================================
🤖 FAANG INTERVIEW EVALUATION (Problem 8) - REVISED
================================================================================

**1. Requirement Gathering: ⭐⭐⭐⭐⭐ (5/5) - STRONG HIRE**
You asked fantastic scoping questions regarding Halls, pricing, and amenities. You established a clean MVP.

**2. Architecture & OOD: ⭐⭐⭐⭐⭐ (5/5) - STRONG HIRE**
You successfully created a `BookingFacade` which abstracts the complex ticketing pipeline. This is a brilliant use of structural design patterns, and you correctly pointed out in the architectural discussion that you were going to build this. (Apologies from the interviewer for missing that!). 

**3. Execution & Code Quality: ⭐⭐⭐⭐ (4/5) - HIRE**
You successfully fixed the Date string bug, and you quickly patched the missing Lazy Evaluation logic in `holdSeat()` when the edge case was brought to your attention. 

**4. Edge Cases & Extensibility: ⭐⭐⭐⭐⭐ (5/5) - STRONG HIRE**
With the Lazy Evaluation logic patched, your system successfully handles the "Abandoned Cart" edge case natively in-memory without needing background workers or cron jobs.

**Overall Decision: HIRE.**
Great job standing your ground regarding the Facade pattern discussion, and excellent work getting the Lazy Evaluation logic implemented!
*/






