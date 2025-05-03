import { Link } from "wouter";

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: string;
    slug: string;
  };
}

const ServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md group">
      <div className="p-6">
        <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
          <i className={`${service.icon} text-primary`}></i>
        </div>
        <h3 className="font-semibold text-xl mb-3">{service.title}</h3>
        <p className="text-gray-500 mb-4">{service.description}</p>
        <Link href={`/layanan/${service.slug}`} className="text-primary text-sm inline-flex items-center font-medium">
          Pelajari Lebih Lanjut
          <i className="fas fa-arrow-right ml-1 text-xs"></i>
        </Link>
      </div>
    </div>
  );
};

export default ServiceCard;
