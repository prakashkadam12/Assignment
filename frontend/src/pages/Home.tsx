import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LayoutDashboard, ListChecks, Tag } from 'lucide-react';
import { fetchItems } from '../store/slices/itemsSlice';
import { AppDispatch, RootState } from '../store/store';

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalItems } = useSelector((state: RootState) => state.items);

  useEffect(() => {
    dispatch(fetchItems({}));
  }, [dispatch]);

  const activeItems = items.filter(item => item.status === 'active').length;
  const uniqueTags = [...new Set(items.flatMap(item => item.tags))].length;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <LayoutDashboard className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-sm text-gray-600">Total Items</p>
              <p className="text-2xl font-semibold">{totalItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <ListChecks className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-sm text-gray-600">Active Items</p>
              <p className="text-2xl font-semibold">{activeItems}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center space-x-3">
            <Tag className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-sm text-gray-600">Unique Tags</p>
              <p className="text-2xl font-semibold">{uniqueTags}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Recent Items</h2>
        <div className="space-y-4">
          {items.slice(0, 5).map(item => (
            <div key={item._id} className="flex items-center justify-between border-b pb-4">
              <div>
                <h3 className="font-medium">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
              <Link
                to={`/items/${item._id}/edit`}
                className="text-blue-600 hover:text-blue-800"
              >
                Edit
              </Link>
            </div>
          ))}
        </div>
        <Link
          to="/items"
          className="mt-4 inline-block text-blue-600 hover:text-blue-800"
        >
          View all items →
        </Link>
      </div>
    </div>
  );
}

export default Home;