import React from 'react';
import {
    DataGrid as MuiDataGrid,
    GridColDef,
    GridRowsProp,
    GridSortModel,
    GridPaginationModel,
    GridFilterModel,
    GridToolbar,
    useGridApiRef,
} from '@mui/x-data-grid';

interface DataGridProps {
    columns: GridColDef[];
    rows: GridRowsProp;
    pageSize?: number;
    pageSizeOptions?: number[];
    rowCount?: number;
    onPageChange?: (model: GridPaginationModel) => void;
    onSortChange?: (model: GridSortModel) => void;
    onFilterChange?: (model: GridFilterModel) => void;
    loading?: boolean;
    checkboxSelection?: boolean;
    disableColumnMenu?: boolean;
    disableColumnFilter?: boolean;
    disableColumnSelector?: boolean;
    disableDensitySelector?: boolean;
    className?: string;
}

const DataGrid: React.FC<DataGridProps> = ({
    columns,
    rows,
    pageSize = 10,
    pageSizeOptions = [5, 10, 25, 50],
    rowCount = 0,
    onPageChange,
    onSortChange,
    onFilterChange,
    loading = false,
    checkboxSelection = false,
    disableColumnMenu = false,
    disableColumnFilter = false,
    disableColumnSelector = false,
    disableDensitySelector = false,
    className = '',
}) => {
    const apiRef = useGridApiRef();

    return (
        <div className={className}>
            <MuiDataGrid
                apiRef={apiRef}
                columns={columns}

                rows={rows}
                rowCount={rowCount}
                pageSizeOptions={pageSizeOptions}
                initialState={{
                    pagination: {
                        paginationModel: { pageSize, page: 0 },
                    },
                }}
                onPaginationModelChange={onPageChange}
                onSortModelChange={onSortChange}
                onFilterModelChange={onFilterChange}
                loading={loading}
                checkboxSelection={checkboxSelection}
                disableColumnMenu={disableColumnMenu}
                disableColumnFilter={disableColumnFilter}
                disableColumnSelector={disableColumnSelector}
                disableDensitySelector={disableDensitySelector}
                slots={{
                    toolbar: GridToolbar,
                }}
                slotProps={{
                    toolbar: {
                        showQuickFilter: true,
                        printOptions: { disableToolbarButton: true },
                        csvOptions: { disableToolbarButton: true },
                    },
                }}
                className={`
          [&_.MuiDataGrid-root]:border-0
          [&_.MuiDataGrid-cell]:px-4
          [&_.MuiDataGrid-cell]:py-3
          [&_.MuiDataGrid-cell]:text-sm
          [&_.MuiDataGrid-cell]:text-gray-600
          [&_.MuiDataGrid-cell]:dark:text-gray-300
          [&_.MuiDataGrid-cell]:border-gray-200
          [&_.MuiDataGrid-cell]:dark:border-gray-700
          [&_.MuiDataGrid-columnHeader]:px-4
          [&_.MuiDataGrid-columnHeader]:py-3
          [&_.MuiDataGrid-columnHeader]:text-sm
          [&_.MuiDataGrid-columnHeader]:font-medium
          [&_.MuiDataGrid-columnHeader]:text-gray-900
          [&_.MuiDataGrid-columnHeader]:dark:text-gray-100
          [&_.MuiDataGrid-columnHeader]:bg-gray-50
          [&_.MuiDataGrid-columnHeader]:dark:bg-gray-700
          [&_.MuiDataGrid-columnHeader]:border-gray-200
          [&_.MuiDataGrid-columnHeader]:dark:border-gray-700
          [&_.MuiDataGrid-row:hover]:bg-gray-50
          [&_.MuiDataGrid-row:hover]:dark:bg-gray-700
          [&_.MuiDataGrid-footerContainer]:border-t
          [&_.MuiDataGrid-footerContainer]:border-gray-200
          [&_.MuiDataGrid-footerContainer]:dark:border-gray-700
          [&_.MuiDataGrid-toolbarContainer]:px-4
          [&_.MuiDataGrid-toolbarContainer]:py-2
          [&_.MuiDataGrid-toolbarContainer]:border-b
          [&_.MuiDataGrid-toolbarContainer]:border-gray-200
          [&_.MuiDataGrid-toolbarContainer]:dark:border-gray-700
          [&_.MuiDataGrid-toolbarContainer]:bg-gray-50
          [&_.MuiDataGrid-toolbarContainer]:dark:bg-gray-700
          [&_.MuiDataGrid-toolbarContainer_button]:text-sm
          [&_.MuiDataGrid-toolbarContainer_button]:text-gray-600
          [&_.MuiDataGrid-toolbarContainer_button]:dark:text-gray-300
          [&_.MuiDataGrid-toolbarContainer_button:hover]:bg-gray-100
          [&_.MuiDataGrid-toolbarContainer_button:hover]:dark:bg-gray-600
          [&_.MuiDataGrid-toolbarContainer_button]:rounded-md
          [&_.MuiDataGrid-toolbarContainer_button]:px-3
          [&_.MuiDataGrid-toolbarContainer_button]:py-1.5
          [&_.MuiDataGrid-toolbarContainer_button]:border
          [&_.MuiDataGrid-toolbarContainer_button]:border-gray-300
          [&_.MuiDataGrid-toolbarContainer_button]:dark:border-gray-600
          [&_.MuiDataGrid-toolbarContainer_button]:bg-white
          [&_.MuiDataGrid-toolbarContainer_button]:dark:bg-gray-800
          [&_.MuiDataGrid-toolbarContainer_input]:text-sm
          [&_.MuiDataGrid-toolbarContainer_input]:text-gray-600
          [&_.MuiDataGrid-toolbarContainer_input]:dark:text-gray-300
          [&_.MuiDataGrid-toolbarContainer_input]:rounded-md
          [&_.MuiDataGrid-toolbarContainer_input]:px-3
          [&_.MuiDataGrid-toolbarContainer_input]:py-1.5
          [&_.MuiDataGrid-toolbarContainer_input]:border
          [&_.MuiDataGrid-toolbarContainer_input]:border-gray-300
          [&_.MuiDataGrid-toolbarContainer_input]:dark:border-gray-600
          [&_.MuiDataGrid-toolbarContainer_input]:bg-white
          [&_.MuiDataGrid-toolbarContainer_input]:dark:bg-gray-800
          [&_.MuiDataGrid-toolbarContainer_input]:focus:ring-2
          [&_.MuiDataGrid-toolbarContainer_input]:focus:ring-primary-500
          [&_.MuiDataGrid-toolbarContainer_input]:focus:border-primary-500
          [&_.MuiDataGrid-toolbarContainer_input]:dark:focus:ring-primary-400
          [&_.MuiDataGrid-toolbarContainer_input]:dark:focus:border-primary-400
        `}
            />
        </div>
    );
};

export default DataGrid; 