import {
  Car,
  Smartphone,
  XIcon,
  Instagram,
  Linkedin,
  MapPin,
  Users,
  Shield,
} from "lucide-react";
import { EmailSubscription } from "./components/EmailSubscription";
function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-100 to-indigo-50">
      {/* Navigation */}
      <nav className="container mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* <div className="bg-blue-600 rounded-xl p-2">
              <Car className="h-6 w-6 text-white" />
            </div> */}
            <img
              src="/logo.png"
              alt="Logo"
              className="mx-auto mb-6 h-24 w-24 rounded-2xl shadow-lg "
            />
            <span className="text-2xl font-bold text-gray-900">Commuter</span>
            {/* <div>
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 w-12 rounded-xl"
              />
            </div> */}
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <span className="text-sm text-gray-600">Coming Soon</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <img
              src="/logo.png"
              alt="Logo"
              className="mx-auto mb-6 h-24 w-24 rounded-2xl shadow-lg "
            />
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 ">
              Commuter
            </h1>
            <div></div>
            <p className="text-xl md:text-2xl text-blue-600 font-medium mb-8">
              Smart Daily Rides. Shared. Safe. Simple.
            </p>
          </div>

          <div className="mb-12">
            <div className="inline-flex items-center bg-white rounded-full px-6 py-3 shadow-lg border border-blue-100 mb-6">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse mr-3"></div>
              <span className="text-gray-700 font-medium">
                Currently in Development
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-bold text-gray-800 mb-4">
              Coming Soon
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We're building the future of daily commuting. Join thousands of
              early adopters and be the first to know when we launch.
            </p>
          </div>

          {/* Features Preview */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Shared Rides</h3>
              <p className="text-gray-600 text-sm">
                Connect with verified commuters on your route
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Safe & Secure
              </h3>
              <p className="text-gray-600 text-sm">
                Background checks and real-time tracking
              </p>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-sm border border-white/50">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Smart Routes</h3>
              <p className="text-gray-600 text-sm">
                AI-powered route optimization
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Email Subscription */}
      <EmailSubscription />

      {/* Platform Availability */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Coming to Your Platform
          </h3>
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center opacity-50">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Smartphone className="h-8 w-8 text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-500">iOS</span>
              <span className="text-xs text-gray-400">Coming Soon</span>
            </div>
            <div className="flex flex-col items-center opacity-50">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mb-4">
                <Smartphone className="h-8 w-8 text-gray-400" />
              </div>
              <span className="text-sm font-medium text-gray-500">Android</span>
              <span className="text-xs text-gray-400">Coming Soon</span>
            </div>
          </div>
        </div>
      </section>

      {/* City Illustration */}
      <section className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="relative h-64 bg-gradient-to-t from-blue-100 to-transparent rounded-3xl overflow-hidden">
            {/* City Skyline */}
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center space-x-2 px-8">
              {/* Buildings */}
              <div className="w-8 h-24 bg-blue-300 rounded-t-lg opacity-80"></div>
              <div className="w-6 h-32 bg-blue-400 rounded-t-lg opacity-70"></div>
              <div className="w-10 h-40 bg-blue-500 rounded-t-lg opacity-90"></div>
              <div className="w-8 h-28 bg-blue-400 rounded-t-lg opacity-75"></div>
              <div className="w-12 h-36 bg-blue-600 rounded-t-lg"></div>
              <div className="w-6 h-20 bg-blue-300 rounded-t-lg opacity-80"></div>
              <div className="w-8 h-32 bg-blue-400 rounded-t-lg opacity-85"></div>
              <div className="w-10 h-44 bg-blue-500 rounded-t-lg opacity-95"></div>
              <div className="w-6 h-24 bg-blue-300 rounded-t-lg opacity-70"></div>
            </div>

            {/* Cars */}
            <div className="absolute bottom-4 left-1/4 transform -translate-x-1/2">
              <div className="w-8 h-4 bg-blue-600 rounded-full opacity-60"></div>
            </div>
            <div className="absolute bottom-4 right-1/3 transform translate-x-1/2">
              <div className="w-6 h-3 bg-blue-500 rounded-full opacity-50"></div>
            </div>

            {/* Connection Lines */}
            <div className="absolute top-1/2 left-1/4 right-1/3 h-px bg-blue-400 opacity-30"></div>
            <div className="absolute top-1/3 left-1/3 right-1/4 h-px bg-blue-400 opacity-20"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 rounded-xl p-2">
                <Car className="h-5 w-5 text-white" />
              </div>
              <span className="text-lg font-bold text-gray-900">Commuter</span>
              {/* <img src="/logo.png" alt="Logo" className="h-8 w-8 rounded-xl" /> */}
            </div>

            <div className="flex items-center space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <XIcon className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-8 pt-8 text-center">
            <p className="text-gray-600">Made with Commuter Team❤️ in Egypt</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
