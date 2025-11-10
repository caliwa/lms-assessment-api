// frontend/src/components/StatCard.jsx
import Card, { CardBody } from './Card';

export default function StatCard({ title, value, icon }) {
  return (
    <Card>
      <CardBody>
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-indigo-600 rounded-md p-3">
            {/*  */}
            {icon}
          </div>
          <div className="ml-5 w-0 flex-1">
            <dt className="text-sm font-medium text-gray-500 truncate">
              {title}
            </dt>
            <dd className="text-3xl font-semibold text-gray-900">
              {value}
            </dd>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}