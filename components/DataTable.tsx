'use client';

import { useState } from 'react';

interface Column {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  searchable?: boolean;
  exportable?: boolean;
  importable?: boolean;
  selectable?: boolean;
  itemsPerPage?: number;
  title?: string;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onMultiDelete?: (selectedRows: any[]) => void;
  onImport?: (file: File) => void;
  onExport?: () => void;
}

export default function DataTable({
  columns,
  data,
  searchable = true,
  exportable = true,
  importable = true,
  selectable = true,
  itemsPerPage = 10,
  title,
  onEdit,
  onDelete,
  onMultiDelete,
  onImport,
  onExport
}: DataTableProps) {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [columnWidths, setColumnWidths] = useState<{[key: string]: number}>({});
  // const [resizing, setResizing] = useState<string | null>(null);

  // Filter and sort data
  const filteredData = data.filter(row => {
    if (!search) return true;
    return columns.some(col => 
      String(row[col.key]).toLowerCase().includes(search.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortBy) return 0;
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (sortOrder === 'asc') {
      return aVal > bVal ? 1 : -1;
    }
    return aVal < bVal ? 1 : -1;
  });

  // Pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedRows(paginatedData.map((_, index) => String(startIndex + index)));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (index: string, checked: boolean) => {
    if (checked) {
      setSelectedRows(prev => [...prev, index]);
    } else {
      setSelectedRows(prev => prev.filter(i => i !== index));
    }
  };

  const handleImportFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onImport) {
      onImport(file);
    }
  };

  const handleColumnResize = (column: string, width: number) => {
    setColumnWidths(prev => ({ ...prev, [column]: width }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          {title && (
            <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          )}
          
          <div className="flex flex-wrap items-center space-x-3 space-y-2 md:space-y-0">
            {/* Search */}
            {searchable && (
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="ri-search-line text-gray-400"></i>
                </div>
                <input
                  type="text"
                  placeholder="Search..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm w-64"
                />
              </div>
            )}

            {/* Multi-delete */}
            {selectedRows.length > 0 && onMultiDelete && (
              <button
                onClick={() => {
                  const selectedData = selectedRows.map(index => paginatedData[parseInt(index) - startIndex]);
                  onMultiDelete(selectedData);
                  setSelectedRows([]);
                }}
                className="flex items-center px-3 py-2 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors"
              >
                <i className="ri-delete-bin-line mr-2"></i>
                Delete ({selectedRows.length})
              </button>
            )}

            {/* Import */}
            {importable && (
              <label className="flex items-center px-4 py-2 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors cursor-pointer">
                <i className="ri-upload-line mr-2"></i>
                Import
                <input
                  type="file"
                  accept=".csv,.xlsx"
                  onChange={handleImportFile}
                  className="hidden"
                />
              </label>
            )}

            {/* Export */}
            {exportable && (
              <button
                onClick={onExport}
                className="flex items-center px-4 py-2 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
              >
                <i className="ri-download-line mr-2"></i>
                Export
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="w-12 px-6 py-4">
                  <input
                    type="checkbox"
                    checked={selectedRows.length === paginatedData.length && paginatedData.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                </th>
              )}
              
              {columns.map((column) => (
                <th
                  key={column.key}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider relative group cursor-pointer"
                  style={{ width: columnWidths[column.key] || column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center justify-between">
                    <span>{column.label}</span>
                    <div className="flex items-center space-x-1">
                      {column.sortable && (
                        <div className="flex flex-col">
                          <i className={`ri-arrow-up-s-line text-xs ${sortBy === column.key && sortOrder === 'asc' ? 'text-blue-600' : 'text-gray-400'}`}></i>
                          <i className={`ri-arrow-down-s-line text-xs -mt-1 ${sortBy === column.key && sortOrder === 'desc' ? 'text-blue-600' : 'text-gray-400'}`}></i>
                        </div>
                      )}
                      
                      {/* Resize handle */}
                      <div
                        className="w-1 h-6 bg-gray-300 opacity-0 group-hover:opacity-100 hover:bg-blue-500 cursor-col-resize transition-opacity"
                        onMouseDown={(e) => {
                          setResizing(column.key);
                          const startX = e.clientX;
                          const startWidth = columnWidths[column.key] || 150;
                          
                          const handleMouseMove = (e: MouseEvent) => {
                            const newWidth = Math.max(100, startWidth + (e.clientX - startX));
                            handleColumnResize(column.key, newWidth);
                          };
                          
                          const handleMouseUp = () => {
                            setResizing(null);
                            document.removeEventListener('mousemove', handleMouseMove);
                            document.removeEventListener('mouseup', handleMouseUp);
                          };
                          
                          document.addEventListener('mousemove', handleMouseMove);
                          document.addEventListener('mouseup', handleMouseUp);
                        }}
                      ></div>
                    </div>
                  </div>
                </th>
              ))}
              
              <th className="w-24 px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedData.map((row, index) => {
              const rowIndex = String(startIndex + index);
              return (
                <tr key={rowIndex} className="hover:bg-gray-50 transition-colors">
                  {selectable && (
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(rowIndex)}
                        onChange={(e) => handleSelectRow(rowIndex, e.target.checked)}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </td>
                  )}
                  
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 text-sm text-gray-900"
                      style={{ width: columnWidths[column.key] || column.width }}
                    >
                      {column.render ? column.render(row[column.key], row) : row[column.key]}
                    </td>
                  ))}
                  
                  <td className="px-6 py-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <i className="ri-edit-line"></i>
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <i className="ri-delete-bin-line"></i>
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
          <div className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} results
          </div>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="ri-arrow-left-s-line"></i>
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const page = i + Math.max(1, currentPage - 2);
              if (page > totalPages) return null;
              
              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm border rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-2 text-sm text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}