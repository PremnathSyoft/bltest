'use client';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  image: string;
}

export default function ServiceCard({ icon, title, description, image }: ServiceCardProps) {
  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 h-full flex flex-col">
      <div className="relative h-56 bg-cover bg-center bg-no-repeat overflow-hidden" style={{backgroundImage: `url('${image}')`}}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-black/30 transition-all duration-300"></div>
        <div className="absolute top-4 right-4 w-12 h-12 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
          <i className={`${icon} text-2xl text-blue-600`}></i>
        </div>
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors duration-300">{title}</h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
        <div className="mt-6 pt-4 border-t border-gray-100">
          <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}