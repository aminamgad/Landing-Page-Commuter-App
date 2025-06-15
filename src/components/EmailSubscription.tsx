import React, { useState } from 'react';
import { Mail, Send, AlertCircle, CheckCircle } from 'lucide-react';
import { useEmailSubscription } from '../hooks/useEmailSubscription';

export function EmailSubscription() {
  const [email, setEmail] = useState('');
  const { isLoading, isSubscribed, error, subscribe, reset } = useEmailSubscription();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await subscribe(email);
    if (!error) {
      setEmail('');
    }
  };

  const handleReset = () => {
    reset();
    setEmail('');
  };

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-md mx-auto">
        <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
          <div className="text-center mb-6">
            <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Stay Updated</h3>
            <p className="text-gray-600">Be the first to know when we launch</p>
          </div>

          {isSubscribed ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-xl font-semibold text-gray-900 mb-2">Welcome Aboard! 🎉</h4>
              <p className="text-gray-600 mb-2">You're now subscribed to Commuter updates.</p>
              <p className="text-sm text-blue-600 mb-4">📧 Check your email for confirmation!</p>
              <button
                onClick={handleReset}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className={`w-full px-4 py-4 border rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 ${
                    error ? 'border-red-300 bg-red-50' : 'border-gray-200'
                  }`}
                  required
                  disabled={isLoading}
                />
                {error && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {error}
                  </div>
                )}
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Subscribing...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Send className="h-5 w-5 mr-2" />
                    Notify Me at Launch
                  </div>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}