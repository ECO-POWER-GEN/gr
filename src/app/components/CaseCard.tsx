import { Link } from 'react-router';

interface CaseCardProps {
  id: string;
  title: string;
  thumbnailUrl: string;
}

export default function CaseCard({ id, title, thumbnailUrl }: CaseCardProps) {
  return (
    <Link to={`/cases/${id}`} className="group block">
      <div className="aspect-[4/3] overflow-hidden rounded-md bg-gray-100">
        <img
          src={thumbnailUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h3 className="mt-3 text-sm text-gray-700 text-left truncate group-hover:text-[#053573] transition-colors">
        {title}
      </h3>
    </Link>
  );
}
