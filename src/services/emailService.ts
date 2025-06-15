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
  private readonly API_ENDPOINT: string;
  private readonly CONFIRMATION_ENDPOINT: string;
  private readonly ADMIN_NOTIFICATION_ENDPOINT: string;
  private readonly ADMIN_EMAIL: string;
  
  constructor() {
    // Use environment variables with fallbacks
    this.API_ENDPOINT = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_SUBSCRIPTION_FORM_ID || 'YOUR_FORM_ID'}`;
    this.CONFIRMATION_ENDPOINT = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_CONFIRMATION_FORM_ID || 'YOUR_CONFIRMATION_FORM_ID'}`;
    this.ADMIN_NOTIFICATION_ENDPOINT = `https://formspree.io/f/${import.meta.env.VITE_FORMSPREE_ADMIN_FORM_ID || 'YOUR_ADMIN_FORM_ID'}`;
    this.ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'admin@commuter.app';
  }
  
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

      // Send confirmation email to user and admin notification in parallel
      await Promise.allSettled([
        this.sendConfirmationEmail(subscriptionData.email),
        this.sendAdminNotification(subscriptionData)
      ]);
      
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

  private async sendAdminNotification(subscriptionData: EmailSubscription): Promise<void> {
    try {
      const stats = this.getSubscriptionStats();
      const adminResponse = await fetch(this.ADMIN_NOTIFICATION_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          email: this.ADMIN_EMAIL,
          subject: '🎉 New Commuter Subscription Alert!',
          message: `
🚗 NEW SUBSCRIPTION ALERT 🚗

A new user has subscribed to Commuter updates!

📧 Email: ${subscriptionData.email}
📅 Date: ${subscriptionData.timestamp.toLocaleString()}
🌐 Source: ${subscriptionData.source}
📊 Total Subscriptions: ${stats.total + 1}
📈 Recent (24h): ${stats.recent + 1}

User Details:
- Subscription Time: ${subscriptionData.timestamp.toISOString()}
- User Agent: ${navigator.userAgent || 'Unknown'}
- Referrer: ${document.referrer || 'Direct'}

Dashboard: ${import.meta.env.VITE_APP_URL || 'https://commuter.app'}

---
Commuter Admin Notifications
Made with ❤️ in Egypt
          `,
          timestamp: subscriptionData.timestamp.toISOString(),
          userEmail: subscriptionData.email,
          subscriptionCount: stats.total + 1
        })
      });

      if (!adminResponse.ok) {
        console.warn('Admin notification failed to send');
      }
    } catch (error) {
      console.warn('Could not send admin notification:', error);
      // Don't throw error here - subscription was successful even if admin notification fails
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

  // Method to get environment configuration status
  getConfigurationStatus(): { configured: boolean; missing: string[] } {
    const requiredEnvVars = [
      'VITE_FORMSPREE_SUBSCRIPTION_FORM_ID',
      'VITE_FORMSPREE_CONFIRMATION_FORM_ID',
      'VITE_FORMSPREE_ADMIN_FORM_ID'
    ];

    const missing = requiredEnvVars.filter(envVar => 
      !import.meta.env[envVar] || import.meta.env[envVar].includes('YOUR_')
    );

    return {
      configured: missing.length === 0,
      missing
    };
  }
}

export const emailService = new EmailService();
export type { EmailSubscription, SubscriptionResponse };