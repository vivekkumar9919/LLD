
/**
 **Problem 1: The Multi-Channel Notification System**
  - **Scenario:** Our SaaS platform needs to send alerts. Currently, we support
   Email and SMS. Users can opt-in to multiple types (e.g., they want Email AND 
   SMS for critical alerts). Next month we are adding Slack and WhatsApp.
  - **Challenge:** Architect a system that allows stacking multiple notification 
   types dynamically without creating a massive class explosion (e.g., you should
    not have to write a `EmailAndSMSAndSlackNotifier` class)
 */

// this is base class for the notifier 

class NotificationChannel {
    constructor() {
        if (this.constructor === NotificationChannel) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }
    send(message) {
        throw new Error("send() method must be implemented");
    }
}

class DefaultNotifications extends NotificationChannel {
    send(message) {
        return `Default Notifications Send with message ${message} \n`;
    }
}


class NotificationDecorator extends NotificationChannel {
    constructor(channels) {
        super();
        if (this.constructor === NotificationDecorator) {
            throw new Error("Abstract classes can't be instantiated.");
        }
        this.notification = channels;
    }
    send(message) {
        return this.notification.send(message);
    }
}

class SMSNotifications extends NotificationDecorator {
    send(message) {
        return super.send(message) + ` SMS Notifications Send with message ${message} \n`
    }
}
class EmailNotifications extends NotificationDecorator {
    send(message) {
        return super.send(message) + ` Email Notifications Send with message ${message} \n`
    }
}
class SlackNotifications extends NotificationDecorator {
    send(message) {
        return super.send(message) + ` Slack Notifications Send with message ${message} \n`
    }
}

// clients side simulations 

class BillingService {
    constructor(notifier) {
        this.notifier = notifier;
    }
    processPayment() {
        console.log("Processing payment...");
        console.log(this.notifier.send("Payment of $50 successful!"));
    }
}

const defaultNotifications = new DefaultNotifications();

const emailAndDefaultNotifications = new EmailNotifications(defaultNotifications);

const emailAndDefaultANDslackNotifications = new SlackNotifications(emailAndDefaultNotifications);


const billing = new BillingService(emailAndDefaultANDslackNotifications);
billing.processPayment();

const billing2 = new BillingService(emailAndDefaultNotifications);
billing2.processPayment();




/*
 [Review] ⭐⭐⭐⭐⭐ 5/5
 
 **Interviewer Feedback:**
 - **Open/Closed Principle:** Perfectly achieved. If the business asks for 
     WhatsApp tomorrow, you just write `class WhatsAppNotifications extends 
     NotificationDecorator` without touching any existing classes.
 - **Dependency Inversion:** Nailed it. `BillingService` depends entirely on an 
     abstraction (the Notifier object), and knows nothing about concrete 
     implementations.
 - **Encapsulation:** Excellent job simulating Abstract classes in JS by 
      checking `this.constructor` in the constructor.
 
 Final Verdict: PASS 🟢 
 You flawlessly recognized the architectural requirement and proposed the correct Structural pattern (Decorator) to avoid class explosion.
 */
