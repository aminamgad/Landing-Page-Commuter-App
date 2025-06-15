interface EmailSubscription {
  email: string;
  timestamp: Date;
  source: string;
}

interface SubscriptionResponse {
  success: boolean;
  message: string;
  subscriptionId?: string;
}

class EmailService {
  private readonly API_ENDPOINT = 'https://formspree.io/f/mrbkklya'; // Replace with your Formspree form ID
  private readonly CONFIRMATION_ENDPOINT = 'https://formspree.io/f/mrbkklya'; // Replace with confirmation form ID
  
  async subscribeToNotifications(email: string): Promise<SubscriptionResponse> {
    try {
      // Validate email format
      if (!this.isValidEmail(email)) {
        throw new Error('Please enter a valid email address');
      }

      const subscriptionData: EmailSubscription = {
        email: email.toLowerCase().trim(),
        timestamp: new Date(),
        source: 'commuter-landing-page'
      };

      // Submit subscription to main form
      const subscriptionResponse = await fetch(this.API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: subscriptionData.email,
          message: `New subscription from Commuter landing page`,
          timestamp: subscriptionData.timestamp.toISOString(),
          source: subscriptionData.source,
          subject: 'New Commuter App Subscription'
        })
      });

      if (!subscriptionResponse.ok) {
        throw new Error(`Subscription failed! status: ${subscriptionResponse.status}`);
      }

      // Send immediate confirmation email to the user
      await this.sendConfirmationEmail(subscriptionData.email);
      
      // Store subscription locally for analytics
      this.storeSubscriptionLocally(subscriptionData);
      
      return {
        success: true,
        message: 'Successfully subscribed! Check your email for confirmation.',
        subscriptionId: Date.now().toString()
      };

    } catch (error) {
      console.error('Email subscription error:', error);
      
      // Fallback: store locally even if API fails
      this.storeSubscriptionLocally({
        email: email.toLowerCase().trim(),
        timestamp: new Date(),
        source: 'commuter-landing-page'
      });
      
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Something went wrong. Please try again.'
      };
    }
  }

  private async sendConfirmationEmail(userEmail: string): Promise<void> {
    try {
      const confirmationResponse = await fetch(this.CONFIRMATION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: userEmail,
          subject: 'Welcome to Commuter - Subscription Confirmed! 🚗',
          message: `
Hi there!

Thank you for subscribing to Commuter updates! 🎉

We're excited to have you on board as we build the future of daily commuting. Here's what you can expect:

✅ You're now on our exclusive early access list
🚗 Smart ride-sharing with verified commuters
🛡️ Safe and secure with background checks
📍 AI-powered route optimization
📱 Coming soon to iOS and Android

We'll keep you updated on our progress and notify you the moment Commuter launches. In the meantime, feel free to follow us on social media for behind-the-scenes updates.

Thanks for joining our community!

The Commuter Team
Made with ❤️ in Egypt

---
This email was sent because you subscribed to Commuter updates at our landing page.
          `,
          replyTo: userEmail,
          timestamp: new Date().toISOString()
        })
      });

      if (!confirmationResponse.ok) {
        console.warn('Confirmation email failed to send, but subscription was successful');
      }
    } catch (error) {
      console.warn('Could not send confirmation email:', error);
      // Don't throw error here - subscription was successful even if confirmation fails
    }
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  private storeSubscriptionLocally(subscription: EmailSubscription): void {
    try {
      const existingSubscriptions = this.getStoredSubscriptions();
      const updatedSubscriptions = [...existingSubscriptions, subscription];
      localStorage.setItem('commuter_subscriptions', JSON.stringify(updatedSubscriptions));
    } catch (error) {
      console.warn('Could not store subscription locally:', error);
    }
  }

  private getStoredSubscriptions(): EmailSubscription[] {
    try {
      const stored = localStorage.getItem('commuter_subscriptions');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.warn('Could not retrieve stored subscriptions:', error);
      return [];
    }
  }

  // Analytics method to track subscription metrics
  getSubscriptionStats(): { total: number; recent: number } {
    const subscriptions = this.getStoredSubscriptions();
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentSubscriptions = subscriptions.filter(
      sub => new Date(sub.timestamp) > oneDayAgo
    );

    return {
      total: subscriptions.length,
      recent: recentSubscriptions.length
    };
  }
}

export const emailService = new EmailService();
export type { EmailSubscription, SubscriptionResponse };