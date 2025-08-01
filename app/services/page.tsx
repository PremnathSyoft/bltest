'use client';

import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ServiceCard from '../../components/ServiceCard';

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
      icon: 'ri-smartphone-line',
      title: 'Easy Booking',
      description: 'Book in seconds through our app'
    },
    {
      icon: 'ri-map-pin-line',
      title: 'Live Tracking',
      description: 'Track your ride in real-time'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Safety Verified',
      description: 'All drivers background checked'
    },
    {
      icon: 'ri-customer-service-line',
      title: '24/7 Support',
      description: 'Round the clock customer service'
    }
  ];

  return (
    <div className="min-h-screen">
      <Header />
      
      <section 
        className="relative py-24 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/images/OurServices.jpg')`
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto">
            Choose from our range of transportation services designed to meet 
            every need and budget.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Available Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From daily commutes to special occasions, we have the perfect ride for every situation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <ServiceCard
                key={index}
                icon={service.icon}
                title={service.title}
                description={service.description}
                image={service.image}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Our Services?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our premium features and exceptional service quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg">
                <div className="w-16 h-16 flex items-center justify-center bg-blue-100 rounded-full mx-auto mb-4">
                  <i className={`${feature.icon} text-3xl text-blue-600`}></i>
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Book Your Ride?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Download our app or sign up online to get started. Your perfect ride is just a few clicks away.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/signin" 
                className="bg-white hover:bg-gray-100 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                Book Now
              </a>
              <a 
                href="/contact" 
                className="bg-transparent hover:bg-blue-700 text-white border-2 border-white px-8 py-4 rounded-lg text-lg font-semibold transition-colors whitespace-nowrap cursor-pointer"
              >
                Get Help
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}