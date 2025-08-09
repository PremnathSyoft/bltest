'use client'

import { useState } from 'react'
import DashboardLayout from '@/components/DashboardLayout'
import DataTable from '@/components/DataTable'
import { 
  useStudents, 
  useCreateStudent, 
  useUpdateStudent, 
  useDeleteStudent, 
  useBulkDeleteStudents,
  useImportStudents,
  useExportStudents,
  Student,
  CreateStudentData 
} from '@/lib/hooks/useStudents'
import { useAuth } from '@/lib/auth-context'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface StudentFormData extends Omit<CreateStudentData, 'password'> {
  password?: string
}

export default function StudentsPage() {
  const { user } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingStudent, setEditingStudent] = useState<Student | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)
  const [selectedStudents, setSelectedStudents] = useState<Student[]>([])

  const itemsPerPage = 10

  // API hooks
  const { data: studentsData, isLoading, error } = useStudents({
    page: currentPage,
    offset: itemsPerPage,
    filters: searchQuery ? JSON.stringify({ search: searchQuery }) : undefined
  })

  const createMutation = useCreateStudent()
  const updateMutation = useUpdateStudent()
  const deleteMutation = useDeleteStudent()
  const bulkDeleteMutation = useBulkDeleteStudents()
  const importMutation = useImportStudents()
  const exportMutation = useExportStudents()

  // Form handling
  const [formData, setFormData] = useState<StudentFormData>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    mobile_number: '',
    email: '',
    profile_pic: '',
    role: 'Customer',
    price_per_hour: 0,
    dob: '',
    terms_accepted: false,
    location_ids: [],
    driving_license_number: '',
    driving_license_image: '',
    address_proof_image: '',
    verification_status: 'pending',
    verification_notes: '',
    password: ''
  })

  // Table columns configuration
  const columns = [
    {
      key: 'first_name',
      label: 'First Name',
      sortable: true,
      width: '150px'
    },
    {
      key: 'last_name',
      label: 'Last Name',
      sortable: true,
      width: '150px'
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true,
      width: '250px'
    },
    {
      key: 'mobile_number',
      label: 'Mobile',
      sortable: true,
      width: '160px'
    },
    {
      key: 'date_of_birth',
      label: 'Date of Birth',
      sortable: true,
      width: '140px',
      render: (value: string) => value ? new Date(value).toLocaleDateString() : '-'
    }
  ]

  // Event handlers
  const handleAddStudent = () => {
    setEditingStudent(null)
    setFormData({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      mobile_number: '',
      email: '',
      profile_pic: '',
      role: 'Customer',
      price_per_hour: 0,
      dob: '',
      terms_accepted: false,
      location_ids: [],
      driving_license_number: '',
      driving_license_image: '',
      address_proof_image: '',
      verification_status: 'pending',
      verification_notes: '',
      password: ''
    })
    setShowAddModal(true)
  }

  const handleEditStudent = (student: Student) => {
    setEditingStudent(student)
    setFormData({
      first_name: student.first_name,
      last_name: student.last_name,
      date_of_birth: student.date_of_birth,
      mobile_number: student.mobile_number,
      email: student.email,
      profile_pic: student.profile_pic || '',
      role: student.role,
      price_per_hour: student.price_per_hour || 0,
      dob: student.dob,
      terms_accepted: student.terms_accepted,
      location_ids: student.location_ids,
      driving_license_number: student.driving_license_number || '',
      driving_license_image: student.driving_license_image || '',
      address_proof_image: student.address_proof_image || '',
      verification_status: student.verification_status,
      verification_notes: student.verification_notes || ''
    })
    setShowAddModal(true)
  }

  const handleDeleteStudent = (student: Student) => {
    setStudentToDelete(student)
    setShowDeleteModal(true)
  }

  const handleBulkDelete = (students: Student[]) => {
    setSelectedStudents(students)
    bulkDeleteMutation.mutate(students.map(s => s.id))
  }

  const handleImport = (file: File) => {
    importMutation.mutate(file)
  }

  const handleExport = (format?: 'csv' | 'excel' | 'pdf', selectedIds?: string[]) => {
    exportMutation.mutate({ 
      format: format || 'csv', 
      user_ids: selectedIds || [],
      filters: searchQuery ? JSON.stringify({ search: searchQuery }) : '' 
    })
  }

  const handleMultiExport = (selectedRows: Student[], format: 'csv' | 'excel' | 'pdf') => {
    exportMutation.mutate({ 
      format, 
      user_ids: selectedRows.map(row => row.id) 
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingStudent) {
      updateMutation.mutate({
        id: editingStudent.id,
        data: formData
      })
    } else {
      if (!formData.password) {
        alert('Password is required for new students')
        return
      }
      createMutation.mutate(formData as CreateStudentData)
    }
    setShowAddModal(false)
  }

  const confirmDelete = () => {
    if (studentToDelete) {
      deleteMutation.mutate(studentToDelete.id)
      setShowDeleteModal(false)
      setStudentToDelete(null)
    }
  }

  if (isLoading) {
    return (
      <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </DashboardLayout>
    )
  }

  if (error) {
    console.error('Students loading error:', error)
    return (
      <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error loading students: {error.message}</p>
            <pre className="mt-2 text-sm text-red-600">{JSON.stringify(error, null, 2)}</pre>
          </div>
        </div>
      </DashboardLayout>
    )
  }

  // Ensure students is always an array
  const students = Array.isArray(studentsData?.data) ? studentsData.data : []

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        {/* DataTable */}
        <DataTable
          columns={columns}
          data={students}
          title="Students Management"
          searchable={true}
          exportable={true}
          importable={true}
          selectable={true}
          itemsPerPage={itemsPerPage}
          onEdit={handleEditStudent}
          onDelete={handleDeleteStudent}
          onMultiDelete={handleBulkDelete}
          onImport={handleImport}
          onExport={handleExport}
          onMultiExport={handleMultiExport}
          addButtonLabel="Add Student"
          onAdd={handleAddStudent}
        />

        {/* Add/Edit Student Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-6 border-b">
                <h3 className="text-lg font-semibold">
                  {editingStudent ? 'Edit Student' : 'Add New Student'}
                </h3>
              </div>
              
              <form onSubmit={handleSubmit} className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.first_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.last_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.mobile_number}
                      onChange={(e) => setFormData(prev => ({ ...prev, mobile_number: e.target.value }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date_of_birth}
                      onChange={(e) => setFormData(prev => ({ 
                        ...prev, 
                        date_of_birth: e.target.value,
                        dob: e.target.value
                      }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role *
                    </label>
                    <select
                      required
                      value={formData.role}
                      onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value as any }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Instructor">Instructor</option>
                      <option value="Admin">Admin</option>
                      <option value="SuperAdmin">Super Admin</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Verification Status
                    </label>
                    <select
                      value={formData.verification_status}
                      onChange={(e) => setFormData(prev => ({ ...prev, verification_status: e.target.value as any }))}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="pending">Pending</option>
                      <option value="approved">Approved</option>
                      <option value="rejected">Rejected</option>
                    </select>
                  </div>
                  
                  {!editingStudent && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Password *
                      </label>
                      <input
                        type="password"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  )}
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.terms_accepted}
                    onChange={(e) => setFormData(prev => ({ ...prev, terms_accepted: e.target.checked }))}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label className="ml-2 text-sm text-gray-700">
                    Terms and conditions accepted
                  </label>
                </div>
                
                <div className="flex items-center space-x-3 pt-4">
                  <button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {createMutation.isPending || updateMutation.isPending ? (
                      <i className="ri-loader-line animate-spin mr-2"></i>
                    ) : (
                      <i className="ri-save-line mr-2"></i>
                    )}
                    {editingStudent ? 'Update Student' : 'Create Student'}
                  </button>
                  
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteModal && studentToDelete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                    <i className="ri-delete-bin-line text-red-600"></i>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Delete Student</h3>
                    <p className="text-gray-600">This action cannot be undone.</p>
                  </div>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Are you sure you want to delete <strong>{studentToDelete.first_name} {studentToDelete.last_name}</strong>?
                </p>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={confirmDelete}
                    disabled={deleteMutation.isPending}
                    className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {deleteMutation.isPending ? (
                      <i className="ri-loader-line animate-spin mr-2"></i>
                    ) : (
                      <i className="ri-delete-bin-line mr-2"></i>
                    )}
                    Delete Student
                  </button>
                  
                  <button
                    onClick={() => {
                      setShowDeleteModal(false)
                      setStudentToDelete(null)
                    }}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
