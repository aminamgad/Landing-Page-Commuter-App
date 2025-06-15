import { useState } from 'react';
import { emailService, SubscriptionResponse } from '../services/emailService';

interface UseEmailSubscriptionReturn {
  isLoading: boolean;
  isSubscribed: boolean;
  error: string | null;
  subscribe: (email: string) => Promise<void>;
  reset: () => void;
}

export function useEmailSubscription(): UseEmailSubscriptionReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const subscribe = async (email: string): Promise<void> => {
    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result: SubscriptionResponse = await emailService.subscribeToNotifications(email);
      
      if (result.success) {
        setIsSubscribed(true);
        setError(null);
        
        // Track successful subscription
        if (typeof gtag !== 'undefined') {
          gtag('event', 'email_subscription', {
            event_category: 'engagement',
            event_label: 'commuter_landing_page'
          });
        }
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('Network error. Please check your connection and try again.');
      console.error('Subscription error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const reset = (): void => {
    setIsSubscribed(false);
    setError(null);
    setIsLoading(false);
  };

  return {
    isLoading,
    isSubscribed,
    error,
    subscribe,
    reset
  };
}