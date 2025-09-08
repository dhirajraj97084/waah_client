import { useEffect, useState } from 'react';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchOffers, createOffer, updateOffer, deleteOffer } from '../../store/slices/offersSlice';
import toast from 'react-hot-toast';

const AdminOffers = () => {
  const dispatch = useAppDispatch();
  const { all, loading, error } = useAppSelector((s) => s.offers);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', badgeText: '', link: '', isActive: true, priority: 0 });

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

  useEffect(() => { if (error) toast.error(error); }, [error]);

  const openCreate = () => { setEditing(null); setForm({ title: '', description: '', badgeText: '', link: '', isActive: true, priority: 0 }); setIsModalOpen(true); };
  const openEdit = (o) => { setEditing(o); setForm({ title: o.title||'', description: o.description||'', badgeText: o.badgeText||'', link: o.link||'', isActive: o.isActive!==false, priority: o.priority||0 }); setIsModalOpen(true); };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editing?._id) {
        await dispatch(updateOffer({ id: editing._id, data: form })).unwrap();
        toast.success('Offer updated');
      } else {
        await dispatch(createOffer(form)).unwrap();
        toast.success('Offer created');
      }
      setIsModalOpen(false); setEditing(null);
      dispatch(fetchOffers());
    } catch (e) {
      toast.error(typeof e === 'string' ? e : 'Failed to save offer');
    }
  };

  const onDelete = async (id) => {
    try { await dispatch(deleteOffer(id)).unwrap(); toast.success('Offer deleted'); }
    catch (e) { toast.error(typeof e === 'string' ? e : 'Failed to delete offer'); }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Offers</h1>
            <p className="text-gray-600">Manage promotional offers shown in the top ticker</p>
          </div>
          <button onClick={openCreate} className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            <Plus className="w-5 h-5" /><span>Add Offer</span>
          </button>
        </div>

        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Badge</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Link</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Active</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {all.map((o) => (
                  <tr key={o._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{o.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{o.badgeText || '-'}</td>
                    <td className="px-6 py-4 text-sm text-blue-600"><a href={o.link} target="_blank" rel="noreferrer">{o.link || '-'}</a></td>
                    <td className="px-6 py-4 text-sm text-gray-900">{o.priority ?? 0}</td>
                    <td className="px-6 py-4 text-sm">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${o.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{o.isActive ? 'Active' : 'Inactive'}</span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <button onClick={() => openEdit(o)} className="text-green-600 hover:text-green-800"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => onDelete(o._id)} className="text-red-600 hover:text-red-800"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {all.length === 0 && !loading && (
            <div className="text-center py-10 text-gray-600">No offers yet</div>
          )}
          {loading && (
            <div className="text-center py-10 text-gray-600">Loading...</div>
          )}
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
            <div className="w-full max-w-xl bg-white rounded-lg shadow-lg">
              <div className="px-6 py-4 border-b flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">{editing ? 'Edit Offer' : 'Add Offer'}</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-700">×</button>
              </div>
              <form onSubmit={onSubmit} className="px-6 py-4 space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Title</label>
                  <input value={form.title} onChange={(e)=>setForm({...form,title:e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Description</label>
                  <textarea value={form.description} onChange={(e)=>setForm({...form,description:e.target.value})} rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Badge Text</label>
                    <input value={form.badgeText} onChange={(e)=>setForm({...form,badgeText:e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Link</label>
                    <input value={form.link} onChange={(e)=>setForm({...form,link:e.target.value})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Priority</label>
                    <input type="number" value={form.priority} onChange={(e)=>setForm({...form,priority:Number(e.target.value)})} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center space-x-2 pt-6">
                    <input id="isActive" type="checkbox" checked={form.isActive} onChange={(e)=>setForm({...form,isActive:e.target.checked})} className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                    <label htmlFor="isActive" className="text-sm text-gray-700">Active</label>
                  </div>
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <button type="button" onClick={()=>setIsModalOpen(false)} className="px-4 py-2 rounded-lg border">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-blue-600 text-white">{editing?'Update':'Create'}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminOffers;


