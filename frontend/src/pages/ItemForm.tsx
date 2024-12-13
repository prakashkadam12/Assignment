import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { createItem, updateItem } from '../store/slices/itemsSlice';
import { AppDispatch } from '../store/store';

interface FormData {
  title: string;
  description: string;
  status: 'active' | 'inactive';
  tags: string;
}

const ItemForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  useEffect(() => {
    if (id) {
      // Fetch item data and populate form
      // This would be implemented when editing existing items
    }
  }, [id]);

  const onSubmit = async (data: FormData) => {
    try {
      const itemData = {
        ...data,
        tags: data.tags.split(',').map((tag) => tag.trim()),
      };

      if (id) {
        await dispatch(updateItem({ id, itemData })).unwrap();
        toast.success('Item updated successfully');
      } else {
        await dispatch(createItem(itemData)).unwrap();
        toast.success('Item created successfully');
      }
      navigate('/items');
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">
        {id ? 'Edit Item' : 'Create New Item'}
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Status</label>
          <select
            {...register('status')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            {...register('tags')}
            placeholder="tag1, tag2, tag3"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/items')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            {id ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ItemForm;