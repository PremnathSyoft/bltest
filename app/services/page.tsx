'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceCard from '../../components/ServiceCard';

// Add custom styles for animations
const customStyles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    33% { transform: translateY(-10px) rotate(1deg); }
    66% { transform: translateY(5px) rotate(-1deg); }
  }
  
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .animate-fade-in-up {
    animation: fade-in-up 0.8s ease-out forwards;
    opacity: 0;
  }
  
  .delay-200 { animation-delay: 200ms; }
  .delay-300 { animation-delay: 300ms; }
  .delay-400 { animation-delay: 400ms; }
  .delay-500 { animation-delay: 500ms; }
  .delay-1000 { animation-delay: 1000ms; }
  
  .bg-grid-pattern {
    background-image: radial-gradient(circle at 1px 1px, rgba(0,0,0,0.15) 1px, transparent 0);
    background-size: 20px 20px;
  }
`;

export default function Services() {
  const services = [
    {
      icon: 'ri-car-line',
      title: 'Standard Ride',
      description: 'Affordable and comfortable rides for everyday travel. Perfect for daily commutes and regular trips around the city.',
      image: '/images/Standard Ride.jpg'
    },
    {
      icon: 'ri-vip-crown-line',
      title: 'Premium Ride',
      description: 'Luxury vehicles with premium amenities for business travel and special occasions. Experience comfort and style.',
      image: '/images/Premium Ride.jpg'
    },
    {
      icon: 'ri-group-line',
      title: 'Group Ride',
      description: 'Spacious vehicles perfect for families and groups. Travel together comfortably with ample space for everyone.',
      image: '/images/Group Ride.jpg'
    },
    {
      icon: 'ri-wheelchair-line',
      title: 'Accessible Ride',
      description: 'Wheelchair accessible vehicles with trained drivers to ensure safe and comfortable transportation for all.',
      image: '/images/Accessible Ride.jpg'
    },
    {
      icon: 'ri-truck-line',
      title: 'Delivery Service',
      description: 'Fast and reliable delivery service for packages and goods. Track your deliveries in real-time.',
      image: '/images/Delivery Service.jpg'
    },
    {
      icon: 'ri-plane-line',
      title: 'Airport Transfer',
      description: 'Reliable airport transfers with flight tracking and professional drivers. Never miss your flight again.',
      image: '/images/Airport Transfer.jpg'
    }
  ];

  const features = [
    {
      icon: 'ri-user-star-line',
      title: 'Expert Drivers',
      description: 'Professional drivers with extensive experience and local knowledge. Trained in safety protocols and customer service excellence for your peace of mind.'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Smart Booking',
      description: 'Book your ride in seconds with our intuitive app. Schedule instantly or plan ahead with our advanced booking system and real-time availability.'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Live GPS Tracking',
      description: 'Track your driver in real-time with precise GPS location updates. Share your trip details with family and friends for added security.'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Safety First',
      description: 'All drivers undergo comprehensive background checks and vehicle inspections. Your safety is our top priority with 24/7 monitoring and support.'
    },
    {
      icon: 'ri-time-line',
      title: 'Always On Time',
      description: 'Reliable service with punctual pickups and efficient routes. We value your time and ensure you reach your destination as scheduled.'
    },
    {
      icon: 'ri-money-dollar-circle-line',
      title: 'Fair Pricing',
      description: 'Transparent, competitive pricing with no hidden fees. Get upfront fare estimates and choose from multiple payment options for your convenience.'
    },
    {
      icon: 'ri-customer-service-line',
      title: '24/7 Support',
      description: 'Round-the-clock customer support ready to assist you. Our dedicated team is available anytime to help with bookings, issues, or questions.'
    },
    {
      icon: 'ri-star-line',
      title: 'Premium Experience',
      description: 'Clean, comfortable vehicles with modern amenities. Enjoy complimentary Wi-Fi, phone charging, and climate control for a superior ride experience.'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />

      <section className="relative py-32 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight">
              Our Services
            </h1>
            <p className="text-xl md:text-2xl max-w-4xl mx-auto text-gray-200 leading-relaxed animate-fade-in-up delay-300">
              Experience premium transportation with cutting-edge technology,
              <span className="text-transparent bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text font-semibold"> designed for every journey</span>
            </p>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full text-sm font-semibold text-blue-800 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Premium Transportation Solutions
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 animate-fade-in-up delay-200">
              Available <span className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              From daily commutes to special occasions, discover our comprehensive range of
              transportation services crafted for every journey and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <ServiceCard
                  icon={service.icon}
                  title={service.title}
                  description={service.description}
                  image={service.image}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-200/40 to-pink-200/40 rounded-full blur-3xl animate-float delay-1000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 rounded-full text-sm font-semibold text-purple-800 mb-6 animate-fade-in-up">
              <span className="w-2 h-2 bg-purple-500 rounded-full mr-2 animate-pulse"></span>
              Why Choose Us
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 animate-fade-in-up delay-200">
              Experience <span className="text-transparent bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text">Excellence</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up delay-400">
              Discover what sets us apart in the world of premium transportation.
              Every detail is crafted to exceed your expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-white/50 h-full flex flex-col relative overflow-hidden animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"></div>

                {/* Animated border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>

                <div className="relative z-10">
                  <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-blue-500 via-purple-500 to-blue-600 rounded-3xl mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl group-hover:shadow-2xl">
                    <i className={`${feature.icon} text-3xl text-white group-hover:scale-110 transition-transform duration-300`}></i>
                  </div>
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl font-bold mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed flex-1 group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-blue-700 rounded-3xl p-12 md:p-16 text-center text-white overflow-hidden shadow-2xl">
            {/* Animated background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-300/10 rounded-full blur-3xl animate-float"></div>
            </div>

            {/* Floating particles */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1 h-1 bg-white/30 rounded-full animate-float"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 3}s`
                  }}
                ></div>
              ))}
            </div>

            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black mb-6 animate-fade-in-up">
                Ready to Book Your <span className="text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">Ride?</span>
              </h2>
              <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto text-blue-100 leading-relaxed animate-fade-in-up delay-200">
                Join thousands of satisfied customers. Your perfect ride is just a few clicks away.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-up delay-400">
                <a
                  href="/signin"
                  className="group bg-white hover:bg-gray-50 text-blue-600 px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 whitespace-nowrap cursor-pointer shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
                >
                  <span className="flex items-center justify-center">
                    Book Now
                    <i className="ri-arrow-right-line ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                  </span>
                </a>
                <a
                  href="/contact"
                  className="group bg-transparent hover:bg-white/10 text-white border-2 border-white/50 hover:border-white px-10 py-5 rounded-2xl text-lg font-bold transition-all duration-300 whitespace-nowrap cursor-pointer backdrop-blur-sm hover:-translate-y-1"
                >
                  <span className="flex items-center justify-center">
                    Get Help
                    <i className="ri-customer-service-line ml-2 group-hover:scale-110 transition-transform duration-300"></i>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}