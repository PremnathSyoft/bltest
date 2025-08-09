'use client';

// Removed unused import: useState
import { useAuth } from '@/lib/auth-context';
import DashboardLayout from '@/components/DashboardLayout';
import DataTable from '@/components/DataTable';
import { 
  useAllPayments, 
  useBulkDeletePayments, 
  useImportPayments, 
  useExportPayments,
  Payment 
} from '@/lib/hooks/usePayments';
import { notifyToast } from '@/lib/toast';

export default function PaymentsPage() {
  const { user } = useAuth();
  const { data, isLoading, error } = useAllPayments();
  const bulkDeleteMutation = useBulkDeletePayments();
  const importMutation = useImportPayments();
  const exportMutation = useExportPayments();

  const handleImport = (file: File) => {
    importMutation.mutate(file, {
      onSuccess: () => {
        notifyToast('Payments imported successfully', 'success');
      },
      onError: (error) => {
        notifyToast(`Import failed: ${error.message}`, 'error');
      }
    });
  };

  const handleExport = (format: 'csv' | 'excel' | 'pdf' = 'csv', selectedIds?: string[]) => {
    exportMutation.mutate({
      format,
      paymentIds: selectedIds && selectedIds.length > 0 ? selectedIds : undefined,
    }, {
      onSuccess: (response) => {
        // Handle the export response - this might be a download link or file data
        if (typeof response === 'string' && response.startsWith('http')) {
          // If it's a download link, open it
          window.open(response, '_blank');
        } else {
          // Otherwise, create a blob and download
          // Convert response to BlobPart - it could be string, ArrayBuffer, or other binary data
          const blobData: BlobPart = typeof response === 'string' ? response : 
            response instanceof ArrayBuffer ? response : 
            response instanceof Uint8Array ? response : 
            JSON.stringify(response);
          
          const blob = new Blob([blobData], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `payments.${format}`;
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }
        notifyToast(`Payments exported to ${format.toUpperCase()} successfully`, 'success');
      },
      onError: (error) => {
        notifyToast(`Export failed: ${error.message}`, 'error');
      }
    });
  };

  const handleMultiDelete = (payments: Payment[]) => {
    const paymentIds = payments.map(p => p.id);
    bulkDeleteMutation.mutate(paymentIds, {
      onSuccess: () => {
        notifyToast('Payments deleted successfully', 'success');
      },
      onError: (error) => {
        notifyToast(`Delete failed: ${error.message}`, 'error');
      }
    });
  };

  const handleMultiExport = (payments: Payment[], format: 'csv' | 'excel' | 'pdf') => {
    const paymentIds = payments.map(p => p.id);
    handleExport(format, paymentIds);
  };

  const columns = [
    { key: 'id', label: 'ID', width: '100px' },
    { key: 'user_id', label: 'User ID', width: '120px' },
    { key: 'slot_id', label: 'Slot ID', width: '120px' },
    { 
      key: 'amount', 
      label: 'Amount', 
      width: '100px',
      render: (value: number) => `$${value.toFixed(2)}`
    },
    { key: 'payment_method', label: 'Payment Method', width: '140px' },
    { key: 'status', label: 'Status', width: '100px' },
    { 
      key: 'created_at', 
      label: 'Created At', 
      width: '150px',
      render: (value: string) => new Date(value).toLocaleDateString()
    },
    { 
      key: 'updated_at', 
      label: 'Updated At', 
      width: '150px',
      render: (value: string) => new Date(value).toLocaleDateString()
    }
  ];

  const payments = data?.data || [];

  if (error) {
    return (
      <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
        <div className="p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Error loading payments: {error.message}</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userType="admin" userName={user?.first_name || 'Admin'}>
      <div className="p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Payments Management</h1>
          <p className="text-gray-600 mt-2">
            Manage all payment transactions, import/export data, and monitor payment statuses.
          </p>
        </div>

        <DataTable
          title="Payments"
          columns={columns}
          data={payments}
          searchable={true}
          exportable={true}
          importable={true}
          selectable={true}
          itemsPerPage={20}
          onImport={handleImport}
          onExport={handleExport}
          onMultiDelete={handleMultiDelete}
          onMultiExport={handleMultiExport}
          addButtonLabel="Add Payment"
          onAdd={() => {
            // TODO: Implement add payment modal/form
            notifyToast('Add payment functionality coming soon', 'info');
          }}
        />

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading payments...</span>
          </div>
        )}

        {/* Import/Export Status */}
        {(importMutation.isPending || exportMutation.isPending) && (
          <div className="fixed bottom-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
            <div className="flex items-center">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              {importMutation.isPending ? 'Importing...' : 'Exporting...'}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
