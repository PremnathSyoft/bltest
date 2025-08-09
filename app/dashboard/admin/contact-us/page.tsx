'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import DataTable from '@/components/DataTable'
import { useAuth } from '@/lib/auth-context'
import { useContactUsList, useBulkDeleteContacts, ContactUs } from '@/lib/hooks/useContactUs'

export default function ContactUsAdminPage() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const itemsPerPage = 10

  const filters = searchQuery ? JSON.stringify({ search: searchQuery }) : undefined
  const { data, isLoading, error } = useContactUsList(currentPage, itemsPerPage, filters)
  const bulkDeleteMutation = useBulkDeleteContacts()

  const contacts = Array.isArray(data?.data) ? data.data : []
  const total = data?.total ?? contacts.length

  const columns = [
    { key: 'name', label: 'Name', sortable: true, width: '200px' },
    { key: 'email', label: 'Email', sortable: true, width: '240px' },
    { key: 'message', label: 'Message', sortable: false, width: '400px', render: (v: string) => v?.slice(0, 120) || '-' },
    { key: 'created_at', label: 'Created', sortable: true, width: '200px', render: (v: string) => v ? new Date(v).toLocaleString() : '-' },
  ]

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
            <p className="text-red-800">Error loading contacts</p>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Contact Us</h1>
          <p className="text-gray-600">Manage user inquiries. Uses global toast rules on API calls.</p>
        </div>

        <DataTable
          columns={columns}
          data={contacts}
          title="Contact Messages"
          itemsPerPage={itemsPerPage}
          searchable
          serverSide
          currentPage={currentPage}
          totalItems={total}
          onPageChange={setCurrentPage}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          exportable={false}
          importable={false}
          selectable
          onMultiDelete={(rows: ContactUs[]) => {
            const ids = rows.map(r => r.id).filter(Boolean) as string[]
            if (ids.length) bulkDeleteMutation.mutate(ids)
          }}
        />
      </div>
    </DashboardLayout>
  )
}


