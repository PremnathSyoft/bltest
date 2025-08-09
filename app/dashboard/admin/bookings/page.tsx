'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import DataTable from '@/components/DataTable'
import { useAuth } from '@/lib/auth-context'
import {
  useBookings,
  useCreateBooking,
  useUpdateBooking,
  useDeleteBooking,
  useBulkDeleteBookings,
  Booking,
  CreateBookingData,
} from '@/lib/hooks/useBookings'
import { useExportLocations } from '@/lib/hooks/useLocations' // reuse export pattern but booking has its own export endpoint

export default function BookingsPage() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 10

  const { data: bookingsData, isLoading, error } = useBookings()
  const createMutation = useCreateBooking()
  const updateMutation = useUpdateBooking()
  const deleteMutation = useDeleteBooking()
  const bulkDeleteMutation = useBulkDeleteBookings()

  // Placeholder: we'll implement import/export via custom calls in the table actions (bookings API supports them)
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState<Booking | null>(null)
  const [form, setForm] = useState<Partial<CreateBookingData>>({
    customer_id: '',
    companion_id: '',
    slot_id: '',
    date: '',
    time: '',
    total_price: 0,
    paid_amount: 0,
    payment_status: 'pending',
    coupon_code: '',
    remarks: '',
  })

  const bookings = Array.isArray(bookingsData?.data) ? bookingsData.data : []
  const total = bookings.length

  const columns = [
    { key: 'customer_id', label: 'Customer', sortable: true, width: '180px' },
    { key: 'companion_id', label: 'Companion', sortable: true, width: '180px' },
    { key: 'date', label: 'Date', sortable: true, width: '160px', render: (v: string) => v ? new Date(v).toLocaleDateString() : '-' },
    { key: 'time', label: 'Time', sortable: true, width: '120px' },
    { key: 'total_price', label: 'Total Price', sortable: true, width: '140px' },
    { key: 'paid_amount', label: 'Paid', sortable: true, width: '120px' },
    { key: 'payment_status', label: 'Status', sortable: true, width: '140px' },
  ]

  const openAdd = () => {
    setEditing(null)
    setForm({ customer_id: '', companion_id: '', slot_id: '', date: '', time: '', total_price: 0, paid_amount: 0, payment_status: 'pending', coupon_code: '', remarks: '' })
    setShowModal(true)
  }
  const openEdit = (row: Booking) => {
    setEditing(row)
    setForm({
      customer_id: row.customer_id,
      companion_id: row.companion_id,
      slot_id: row.slot_id,
      date: row.date,
      time: row.time,
      total_price: row.total_price,
      paid_amount: row.paid_amount,
      payment_status: row.payment_status,
      coupon_code: row.coupon_code,
      remarks: row.remarks,
    })
    setShowModal(true)
  }
  const onDelete = (row: Booking) => {
    if (row.id) deleteMutation.mutate(row.id)
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (editing && editing.id) {
      updateMutation.mutate({ id: editing.id, data: form })
    } else {
      createMutation.mutate(form as CreateBookingData)
    }
    setShowModal(false)
  }

  // Import/Export handlers specific to bookings
  const handleImport = async (file: File) => {
    const token = localStorage.getItem('access_token')
    const formData = new FormData()
    formData.append('file', file)
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/bookings/import`, {
      method: 'POST',
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    })
    if (!response.ok) {
      const { notifyToast } = await import('@/lib/toast')
      notifyToast(`Import failed: ${response.status} ${response.statusText}`, 'error')
      return
    }
    const { notifyToast } = await import('@/lib/toast')
    notifyToast('Import completed successfully', 'success')
  }

  const handleExport = async (format: 'csv' | 'excel' | 'pdf', selectedIds?: string[]) => {
    const token = localStorage.getItem('access_token')
    const formData = new FormData()
    formData.append('export_format', format)
    selectedIds?.forEach(id => formData.append('booking_ids', id))
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'https://rtcblissdrive.onrender.com'}/api/bookings/export`, {
      method: 'POST',
      headers: { ...(token && { Authorization: `Bearer ${token}` }) },
      body: formData,
    })
    if (!response.ok) {
      const { notifyToast } = await import('@/lib/toast')
      notifyToast(`Export failed: ${response.status} ${response.statusText}`, 'error')
      return
    }
    const blob = await response.blob()
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `bookings_export.${format === 'excel' ? 'xlsx' : format}`
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
    const { notifyToast } = await import('@/lib/toast')
    notifyToast('Export started', 'success')
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
            <p className="text-red-800">Error loading bookings</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
          <p className="text-gray-600">Manage bookings. Global toast rules apply to API calls.</p>
        </div>

        <DataTable
          columns={columns}
          data={bookings}
          title="Bookings Management"
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
          onMultiDelete={(rows: Booking[]) => {
            const ids = rows.map(r => r.id).filter(Boolean) as string[]
            if (ids.length) bulkDeleteMutation.mutate(ids)
          }}
          onImport={(file: File) => handleImport(file)}
          onExport={(format, selectedIds) => handleExport((format || 'csv') as any, selectedIds)}
          onMultiExport={(rows: Booking[], format) => {
            const ids = rows.map(r => r.id).filter(Boolean) as string[]
            handleExport(format, ids)
          }}
          addButtonLabel="New Booking"
          onAdd={openAdd}
        />

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-xl w-full">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">{editing ? 'Edit Booking' : 'New Booking'}</h3>
              </div>
              <form onSubmit={onSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Customer ID</label>
                    <input
                      required
                      type="text"
                      value={form.customer_id || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, customer_id: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Companion ID</label>
                    <input
                      required
                      type="text"
                      value={form.companion_id || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, companion_id: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Slot ID</label>
                    <input
                      required
                      type="text"
                      value={form.slot_id || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, slot_id: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <input
                      required
                      type="date"
                      value={form.date || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <input
                      required
                      type="text"
                      value={form.time || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, time: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Price</label>
                    <input
                      required
                      type="number"
                      value={form.total_price ?? 0}
                      onChange={(e) => setForm(prev => ({ ...prev, total_price: Number(e.target.value) }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount</label>
                    <input
                      required
                      type="number"
                      value={form.paid_amount ?? 0}
                      onChange={(e) => setForm(prev => ({ ...prev, paid_amount: Number(e.target.value) }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <input
                      required
                      type="text"
                      value={form.payment_status || ''}
                      onChange={(e) => setForm(prev => ({ ...prev, payment_status: e.target.value }))}
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


