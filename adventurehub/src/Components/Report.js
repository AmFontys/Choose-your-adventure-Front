import * as React from 'react';
import { deleteReports, getReports, updateReport } from '../Services/reportService';
import { DataGrid, GridActionsCellItem, GridRowModes, } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const getRows = () => {
  let tempData = [];
  getReports()
    .then(res => { tempData = (res.data); })
  return tempData
};

export default function Report() {
  const [data, setData] = React.useState(getRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const navigate = useNavigate();

  React.useEffect(() => {
    getReports()
      .then(res => { setData(res.data); })
  }, [])
  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });


  };

  const handleDeleteClick = (id) => () => {
    console.log("clicked delete");
    var confirmation = window.confirm("Are you sure you want to delete this report?");
    if (confirmation) {
      setData(data.filter((row) => row.reportid !== id));
      data.map((row) => row.reportid === id ?
        deleteReports(row.reportid)
          .then(r => {
            console.log(r);
          }
          ).catch(r => {
            console.log(r);
            alert("Something went wrong please try again")
          })
        : null);
    }
    else {
      alert("Report not deleted");
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = data.find((row) => row.userid === id);
    if (editedRow.isNew) {
      setData(data.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setData(data.map((row) => (row.userid === newRow.userid ? updatedRow : row)));

    const res = updateReport(updatedRow)
    console.log(res);
    return updatedRow;
  };

  function getReportTypes(params) {
    return params.row.type.type;
  }

  const columns = [
    { field: 'reportText', headerName: 'Report text', width: 780, editable: true },
    { field: 'type', headerName: 'Report type', width: 380, editable: false, valueGetter: getReportTypes },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 100,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<Save />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<Cancel />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<Edit />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<Delete />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ]

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <h1>Report Information</h1>
      <DataGrid
        rows={data}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        getRowId={(row) => row.reportid}

        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}
