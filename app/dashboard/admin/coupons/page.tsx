'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import DataTable from '@/components/DataTable'
import { useAuth } from '@/lib/auth-context'
import {
  useCoupons,
  useCreateCoupon,
  useUpdateCoupon,
  useDeleteCoupon,
  useBulkDeleteCoupons,
  useImportCoupons,
  useExportCoupons,
  useValidateCoupon,
  useCouponByCode,
  Coupon,
} from '@/lib/hooks/useCoupons'

export default function CouponsPage() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 10

  const { data: couponsData, isLoading, error } = useCoupons()
  const createMutation = useCreateCoupon()
  const updateMutation = useUpdateCoupon()
  const deleteMutation = useDeleteCoupon()
  const bulkDeleteMutation = useBulkDeleteCoupons()
  const importMutation = useImportCoupons()
  const exportMutation = useExportCoupons()
  const validateMutation = useValidateCoupon()
  const byCodeMutation = useCouponByCode()

  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Coupon | null>(null)
  const [form, setForm] = useState<Partial<Coupon>>({ code: '', discount_percent: 0, expires_at: '', is_active: true })

  const coupons = Array.isArray(couponsData?.data) ? couponsData.data : []
  const total = coupons.length

  const columns = [
    { key: 'code', label: 'Code', sortable: true, width: '180px' },
    { key: 'discount_percent', label: 'Discount %', sortable: true, width: '140px' },
    { key: 'expires_at', label: 'Expires At', sortable: true, width: '200px', render: (v: string) => v ? new Date(v).toLocaleString() : '-' },
    { key: 'is_active', label: 'Active', sortable: true, width: '120px', render: (v: boolean) => v ? 'Yes' : 'No' },
  ]

  const openAdd = () => {
    setEditing(null)
    setForm({ code: '', discount_percent: 0, expires_at: '', is_active: true })
    setShowModal(true)
  }
  const openEdit = (row: Coupon) => {
    setEditing(row)
    setForm({
      code: row.code,
      discount_percent: row.discount_percent,
      expires_at: row.expires_at,
      is_active: row.is_active,
    })
    setShowModal(true)
  }
  const onDelete = (row: Coupon) => {
    if (row.id) deleteMutation.mutate(row.id)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing && editing.id) {
      updateMutation.mutate({ id: editing.id, data: form })
    } else {
      createMutation.mutate(form as Coupon)
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
            <p className="text-red-800">Error loading coupons</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Coupons</h1>
          <p className="text-gray-600">Manage coupons. Uses global toast rules on API calls.</p>
        </div>

        <div className="mb-4 flex items-center space-x-3">
          <input
            type="text"
            placeholder="Validate or fetch by code"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={() => validateMutation.mutate(searchQuery)}
            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >Validate</button>
          <button
            onClick={() => byCodeMutation.mutate(searchQuery)}
            className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >Get By Code</button>
        </div>

        <DataTable
          columns={columns}
          data={coupons}
          title="Coupons Management"
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
          onMultiDelete={(rows: Coupon[]) => {
            const ids = rows.map(r => r.id).filter(Boolean) as string[]
            if (ids.length) bulkDeleteMutation.mutate(ids)
          }}
          onImport={(file: File) => importMutation.mutate(file)}
          onExport={(format, selectedIds) => exportMutation.mutate({ format: (format || 'csv') as any, coupon_ids: selectedIds || [] })}
          onMultiExport={(rows: Coupon[], format) => {
            const ids = rows.map(r => r.id).filter(Boolean) as string[]
            exportMutation.mutate({ format, coupon_ids: ids })
          }}
          addButtonLabel="Add Coupon"
          onAdd={openAdd}
        />

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-xl w-full">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">{editing ? 'Edit Coupon' : 'Add Coupon'}</h3>
              </div>
              <form onSubmit={onSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Code</label>
                    <input
                      required
                      type="text"
                      value={form.code || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, code: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                    <input
                      required
                      type="number"
                      min={0}
                      max={100}
                      value={form.discount_percent ?? 0}
                      onChange={(e) => setForm(prev => ({ ...prev, discount_percent: Number(e.target.value) }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expires At</label>
                    <input
                      type="datetime-local"
                      value={form.expires_at || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, expires_at: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex items-center mt-6">
                    <input
                      id="active"
                      type="checkbox"
                      checked={!!form.is_active}
                      onChange={(e) => setForm(prev => ({ ...prev, is_active: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="active" className="ml-2 text-sm text-gray-700">Active</label>
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


