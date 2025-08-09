'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import DataTable from '@/components/DataTable'
import { useAuth } from '@/lib/auth-context'
import {
  useLocations,
  useCreateLocation,
  useUpdateLocation,
  useDeleteLocation,
  useBulkDeleteLocations,
  useImportLocations,
  useExportLocations,
  Location,
} from '@/lib/hooks/useLocations'

export default function LocationsPage() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const { data: locationsData, isLoading, error } = useLocations()
  const createMutation = useCreateLocation()
  const updateMutation = useUpdateLocation()
  const deleteMutation = useDeleteLocation()
  const bulkDeleteMutation = useBulkDeleteLocations()
  const importMutation = useImportLocations()
  const exportMutation = useExportLocations()

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Location | null>(null)
  const [form, setForm] = useState<Partial<Location>>({ name: '', city: '', state: '', country: '', zip_code: '' })

  const columns = [
    { key: 'name', label: 'Name', sortable: true, width: '220px' },
    { key: 'address', label: 'Address', sortable: true, width: '260px' },
    { key: 'city', label: 'City', sortable: true, width: '140px' },
    { key: 'state', label: 'State', sortable: true, width: '120px' },
    { key: 'country', label: 'Country', sortable: true, width: '140px' },
    { key: 'zip_code', label: 'ZIP', sortable: true, width: '120px' },
  ]

  const locations = Array.isArray(locationsData?.data) ? locationsData.data : []
  const total = locations.length

  const openAdd = () => {
    setEditing(null)
    setForm({ name: '', address: '', city: '', state: '', country: '', zip_code: '' })
    setShowModal(true)
  }
  const openEdit = (row: Location) => {
    setEditing(row)
    setForm({
      name: row.name,
      address: row.address,
      city: row.city,
      state: row.state,
      country: row.country,
      zip_code: row.zip_code,
      latitude: row.latitude,
      longitude: row.longitude,
      is_active: row.is_active,
    })
    setShowModal(true)
  }
  const onDelete = (row: Location) => {
    if (row.id) deleteMutation.mutate(row.id)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing && editing.id) {
      updateMutation.mutate({ locationId: editing.id, data: form })
    } else {
      createMutation.mutate(form as Location)
    }
    setShowModal(false)
  }

  if (isLoading) {
    return (
      <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
        <div className="p-6 flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    return (
      <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error loading locations</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        {/* <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Locations</h1>
          <p className="text-gray-600">Manage service locations. Uses global toast rules on API calls.</p>
        </div> */}

        <DataTable
          columns={columns}
          data={locations}
          title="Locations Management"
          itemsPerPage={itemsPerPage}
          searchable
          serverSide
          currentPage={currentPage}
          totalItems={total}
          onPageChange={setCurrentPage}
          searchValue={''}
          onSearchChange={() => {}}
          exportable
          importable
          selectable
          onEdit={openEdit}
          onDelete={onDelete}
          onMultiDelete={(rows: Location[]) => {
            const ids = rows.map(r => r.id).filter(Boolean) as string[]
            if (ids.length) bulkDeleteMutation.mutate(ids)
          }}
          onImport={(file: File) => importMutation.mutate(file)}
          onExport={(format, selectedIds) => exportMutation.mutate({ format: (format || 'csv') as any, location_ids: selectedIds || [] })}
          onMultiExport={(rows: Location[], format) => {
            const ids = rows.map(r => r.id).filter(Boolean) as string[]
            exportMutation.mutate({ format, location_ids: ids })
          }}
          addButtonLabel="Add Location"
          onAdd={openAdd}
        />

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-xl w-full">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">{editing ? 'Edit Location' : 'Add Location'}</h3>
              </div>
              <form onSubmit={onSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      required
                      type="text"
                      value={form.name || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <input
                      type="text"
                      value={form.address || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, address: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      value={form.city || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      value={form.state || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, state: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      value={form.country || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, country: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
                    <input
                      type="text"
                      value={form.zip_code || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, zip_code: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <div className="flex items-center space-x-3 pt-2">
                  <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">{editing ? 'Update' : 'Create'}</button>
                  <button type="button" className="px-4 py-2 bg-gray-100 rounded-lg" onClick={() => setShowModal(false)}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}


