'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import DataTable from '@/components/DataTable'
import { useAuth } from '@/lib/auth-context'
import {
  useSafetyCompanions,
  useCreateSafetyCompanion,
  useUpdateSafetyCompanion,
  useDeleteSafetyCompanion,
  useBulkDeleteSafetyCompanions,
  useImportSafetyCompanions,
  useExportSafetyCompanions,
} from '@/lib/hooks/useSafetyCompanions'
import { UserProfile } from '@/lib/hooks/useProfile'
import Link from 'next/link'

export default function SafetyCompanionsPage() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 10

  const filters = searchQuery ? JSON.stringify({ search: searchQuery }) : undefined
  const { data: companionsData, isLoading, error } = useSafetyCompanions(currentPage, itemsPerPage, filters)
  const createMutation = useCreateSafetyCompanion()
  const updateMutation = useUpdateSafetyCompanion()
  const deleteMutation = useDeleteSafetyCompanion()
  const bulkDeleteMutation = useBulkDeleteSafetyCompanions()
  const importMutation = useImportSafetyCompanions()
  const exportMutation = useExportSafetyCompanions()

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<UserProfile | null>(null)
  const [form, setForm] = useState<Partial<UserProfile & { password?: string }>>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    mobile_number: '',
    email: '',
    role: 'SafetyCompanion',
    price_per_hour: 0,
    terms_accepted: false,
    location_ids: [],
    driving_license_number: '',
    driving_license_image: '',
    address_proof_image: '',
    verification_status: 'pending',
    verification_notes: '',
    // password only for new companions
    password: '',
  })

  const companions = Array.isArray(companionsData?.data) ? companionsData.data : []
  const total = companionsData?.total ?? companions.length

  const columns = [
    { key: 'first_name', label: 'First Name', sortable: true, width: '160px' },
    { key: 'last_name', label: 'Last Name', sortable: true, width: '160px' },
    { key: 'email', label: 'Email', sortable: true, width: '240px' },
    { key: 'mobile_number', label: 'Mobile', sortable: true, width: '160px' },
    { key: 'verification_status', label: 'Status', sortable: true, width: '140px' },
  ]

  const openAdd = () => {
    setEditing(null)
    setForm({
      first_name: '', last_name: '', email: '', mobile_number: '', date_of_birth: '',
      role: 'SafetyCompanion', price_per_hour: 0, terms_accepted: false, location_ids: [],
      driving_license_number: '', driving_license_image: '', address_proof_image: '',
      verification_status: 'pending', verification_notes: '', password: '',
    })
    setShowModal(true)
  }

  const openEdit = (row: UserProfile) => {
    setEditing(row)
    setForm({
      first_name: row.first_name,
      last_name: row.last_name,
      date_of_birth: row.date_of_birth,
      mobile_number: row.mobile_number,
      email: row.email,
      role: 'SafetyCompanion',
      price_per_hour: row.price_per_hour || 0,
      terms_accepted: row.terms_accepted || false,
      location_ids: row.location_ids || [],
      driving_license_number: row.driving_license_number || '',
      driving_license_image: row.driving_license_image || '',
      address_proof_image: row.address_proof_image || '',
      verification_status: row.verification_status || 'pending',
      verification_notes: row.verification_notes || '',
    })
    setShowModal(true)
  }

  const onDelete = (row: UserProfile) => {
    if (row.id) deleteMutation.mutate(row.id)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing && editing.id) {
      updateMutation.mutate({ userId: editing.id, data: form })
    } else {
      // password required for new
      if (!form.password) {
        alert('Password is required')
        return
      }
      createMutation.mutate(form as any)
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
            <p className="text-red-800">Error loading safety companions</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Safety Companions</h1>
          <p className="text-gray-600">Manage safety companions. Global toast rules apply to API calls.</p>
        </div>

        <DataTable
          columns={columns}
          data={companions}
          title="Safety Companions Management"
          itemsPerPage={itemsPerPage}
          searchable
          serverSide
          currentPage={currentPage}
          totalItems={total}
          onPageChange={setCurrentPage}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          exportable
          importable
          selectable
          onEdit={openEdit}
          onDelete={onDelete}
          onMultiDelete={(rows: UserProfile[]) => {
            const ids = rows.map(r => r.id).filter(Boolean) as string[]
            if (ids.length) bulkDeleteMutation.mutate(ids)
          }}
          onImport={(file: File) => importMutation.mutate(file)}
          onExport={(format, selectedIds) => exportMutation.mutate({ format: (format || 'csv') as any, user_ids: selectedIds || [] })}
          onMultiExport={(rows: UserProfile[], format) => {
            const ids = rows.map(r => r.id).filter(Boolean) as string[]
            exportMutation.mutate({ format, user_ids: ids })
          }}
          addButtonLabel="Add Safety Companion"
          onAdd={openAdd}
          extraActions={[
            {
              title: 'Availability',
              iconClass: 'ri-calendar-check-line',
              onClick: (row: UserProfile) => {
                if (!row.id) return
                window.location.href = `/dashboard/admin/safety-companions/${row.id}/availability`
              },
            },
          ]}
        />

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">{editing ? 'Edit Safety Companion' : 'Add Safety Companion'}</h3>
              </div>
              <form onSubmit={onSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                    <input
                      required
                      type="text"
                      value={form.first_name || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, first_name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                    <input
                      required
                      type="text"
                      value={form.last_name || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, last_name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Mobile *</label>
                    <input
                      required
                      type="tel"
                      value={form.mobile_number || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, mobile_number: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                    <input
                      required
                      type="date"
                      value={form.date_of_birth || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, date_of_birth: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                    <input
                      type="text"
                      value={'SafetyCompanion'}
                      disabled
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 bg-gray-50"
                    />
                  </div>
                  {!editing && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                      <input
                        required
                        type="password"
                        value={form.password || ''}
                        onChange={(e) => setForm(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
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


