'use client';

interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
  image: string;
}

export default function ServiceCard({ icon, title, description, image }: ServiceCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
      <div className="h-48 bg-cover bg-center bg-no-repeat" style={{backgroundImage: `url('${image}')`}}>
      </div>
      <div className="p-6">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 rounded-lg mb-4">
          <i className={`${icon} text-2xl text-blue-600`}></i>
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
}