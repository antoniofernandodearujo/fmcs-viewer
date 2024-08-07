import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Box, styled } from "@mui/system";

interface DataTableProps {
  data: any[];
}

const columns: GridColDef[] = [
  {
    field: "created_dt",
    headerName: "Created Date",
    width: 200,
  },
  {
    field: "data_source_modified_dt",
    headerName: "Modified Date",
    width: 200,
  },
  { field: "entity_type", headerName: "Entity", width: 150 },
  { field: "record_status", headerName: "Operating Status", width: 150 },
  { field: "legal_name", headerName: "Legal Name", width: 150 },
  { field: "dba_name", headerName: "DBA Name", width: 150 },
  { field: "physical_address", headerName: "Physical Address", width: 200 },
  { field: "phone", headerName: "Phone", width: 150 },
  { field: "usdot_number", headerName: "DOT", width: 150 },
  { field: "power_units", headerName: "Power Units", width: 150 },
  { field: "mcs_150_form_date", headerName: "Out of Service Date", width: 200 },
];

const StyledDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#f0f0f0",
    fontSize: "16px",
    fontWeight: "bold",
  },
  "& .MuiDataGrid-row": {
    "&:nth-of-type(odd)": {
      backgroundColor: "#f9f9f9",
    },
  },
});

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [groupBy, setGroupBy] = React.useState<string>("none");

  const handleGroupByChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setGroupBy(event.target.value as string);
  };

  const groupedData = React.useMemo(() => {
    if (groupBy === "none") return data;

    return data.reduce((acc, row) => {
      const date = new Date(row.created_dt);
      let key;
      switch (groupBy) {
        case "month":
          key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
          break;
        case "week":
          const week = Math.ceil((date.getDate() - 1 - date.getDay()) / 7) + 1;
          key = `${date.getFullYear()}-W${String(week).padStart(2, "0")}`;
          break;
        case "year":
          key = date.getFullYear().toString();
          break;
        default:
          key = "none";
      }
      if (!acc[key]) acc[key] = [];
      acc[key].push(row);
      return acc;
    }, {} as Record<string, any[]>);
  }, [data, groupBy]);

  const rows = React.useMemo(() => {
    if (groupBy === "none") {
      return data;
    }

    return Object.values(groupedData).flat().map((row, index) => ({
      row,
      id: index,
    }));
  }, [groupedData, groupBy, data]);

  return (
    <div style={{ height: 900, width: "100%", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box 
        display="flex" 
        justifyContent="center" 
        mt={2}
        sx={{
          '@media (max-width: 600px)': {
            flexDirection: 'column',
            alignItems: 'center',
          },
        }}
      >
        <FormControl variant="outlined" sx={{ marginBottom: "1rem", width: '200px' }}>
          <InputLabel>Group By</InputLabel>
          <Select value={groupBy} onChange={() => handleGroupByChange} label="Group By">
            <MenuItem value="none">None</MenuItem>
            <MenuItem value="month">Month</MenuItem>
            <MenuItem value="week">Week</MenuItem>
            <MenuItem value="year">Year</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <StyledDataGrid
        rows={rows}
        columns={columns}
        pagination
        sortingOrder={["asc", "desc"]}
        sx={{
          
          width: '99%',

          '@media (max-width: 600px)': {
            '& .MuiDataGrid-cell': {
              padding: '8px',
            },
            '& .MuiDataGrid-columnHeaders': {
              fontSize: '14px',
            },
          },
        }}
      />
    </div>
  );
};

export default DataTable;
