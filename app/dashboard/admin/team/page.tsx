'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import DataTable from '@/components/DataTable';
import { TeamMemberForm } from '@/components/TeamMemberForm';
import { useTeamMembers, TeamMember, TeamMemberFormData } from '@/lib/hooks/useTeamMembers';
import { notifyToast } from '@/lib/toast';
import { useAuth } from '@/lib/auth-context';

export default function TeamMembersPage() {
  const { user } = useAuth();
  const {
    teamMembers,
    loading,
    error,
    fetchTeamMembers,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember,
    bulkDeleteTeamMembers,
    importTeamMembers,
    exportTeamMembers,
    clearError
  } = useTeamMembers();

  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [formData, setFormData] = useState<TeamMemberFormData>({
    first_name: '',
    last_name: '',
    date_of_birth: '',
    mobile_number: '',
    email: '',
    profile_pic: '',
    role: 'Driver',
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
  });


  useEffect(() => {
    fetchTeamMembers();
  }, [fetchTeamMembers]);

  useEffect(() => {
    if (error) {
      notifyToast(error, 'error');
      clearError();
    }
  }, [error, clearError]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      let success: boolean;
      
      if (editingMember) {
        success = await updateTeamMember(editingMember.id, formData);
        if (success) {
          notifyToast('Team member updated successfully', 'success');
        }
      } else {
        success = await createTeamMember(formData);
        if (success) {
          notifyToast('Team member created successfully', 'success');
        }
      }
      
      if (success) {
        setShowForm(false);
        setEditingMember(null);
        resetForm();
      }
    } catch (error) {
      notifyToast('Failed to save team member', 'error');
    }
  };

  const handleEdit = (member: TeamMember) => {
    setEditingMember(member);
    setFormData({
      first_name: member.first_name,
      last_name: member.last_name,
      date_of_birth: member.created_at?.split('T')[0] || '',
      mobile_number: member.mobile_number,
      email: member.email,
      profile_pic: '',
      role: member.role,
      price_per_hour: member.price_per_hour,
      dob: member.created_at?.split('T')[0] || '',
      terms_accepted: false,
      location_ids: [],
      driving_license_number: '',
      driving_license_image: '',
      address_proof_image: '',
      verification_status: member.verification_status,
      verification_notes: '',
      password: ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    const success = await deleteTeamMember(id);
    if (success) {
      notifyToast('Team member deleted successfully', 'success');
    }
  };

  const handleBulkDelete = async (selectedRows: TeamMember[]) => {
    if (selectedRows.length === 0) {
      notifyToast('Please select members to delete', 'error');
      return;
    }
    
    if (!confirm(`Are you sure you want to delete ${selectedRows.length} team members?`)) return;
    
    const success = await bulkDeleteTeamMembers(selectedRows.map(row => row.id));
    if (success) {
      notifyToast('Team members deleted successfully', 'success');
    }
  };

  const handleImport = async (file: File) => {
    const success = await importTeamMembers(file);
    if (success) {
      notifyToast('Team members imported successfully', 'success');
    }
  };

  const handleExport = async (format: 'csv' | 'excel' | 'pdf', selectedIds?: string[]) => {
    const success = await exportTeamMembers(format, selectedIds);
    if (success) {
      notifyToast(`Team members exported as ${format.toUpperCase()}`, 'success');
    }
  };

  const resetForm = () => {
    setFormData({
      first_name: '',
      last_name: '',
      date_of_birth: '',
      mobile_number: '',
      email: '',
      profile_pic: '',
      role: 'Driver',
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
    });
  };



  const filteredMembers = teamMembers;

  const columns = [
    { key: 'name', label: 'Name', render: (member: TeamMember) => `${member.first_name} ${member.last_name}` },
    { key: 'email', label: 'Email' },
    { key: 'mobile_number', label: 'Mobile' },
    { key: 'role', label: 'Role' },
    { key: 'verification_status', label: 'Status' },
    { key: 'price_per_hour', label: 'Price/Hour' },
    { key: 'actions', label: 'Actions', render: (member: TeamMember) => (
      <div className="flex space-x-2">
        <button
          onClick={() => handleEdit(member)}
          className="text-blue-600 hover:text-blue-800"
        >
          Edit
        </button>
        <button
          onClick={() => handleDelete(member.id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </div>
    )}
  ];

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
        </div>



      {/* Team Members Table */}
      <div className="bg-white rounded-lg shadow">
        <DataTable
          columns={columns}
          data={filteredMembers}
          title="Team Members Management"
          searchable={true}
          exportable={true}
          importable={true}
          selectable={true}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onMultiDelete={handleBulkDelete}
          onImport={handleImport}
          onExport={handleExport}
          addButtonLabel="Add Team Member"
          onAdd={() => {
            setShowForm(true);
            setEditingMember(null);
            resetForm();
          }}
        />
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <TeamMemberForm
          formData={formData}
          editingMember={editingMember}
          onSubmit={handleSubmit}
          onInputChange={handleInputChange}
          onClose={() => setShowForm(false)}
        />
      )}


        </div>
      </DashboardLayout>
    );
  }
