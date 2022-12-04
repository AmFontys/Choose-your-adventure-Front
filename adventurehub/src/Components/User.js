import * as React from 'react';
import { updateUser } from '../Services/userService';
import { deleteUser } from '../Services/userService';
import {DataGrid, GridActionsCellItem, GridRowModes,} from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { Cancel, Delete, Edit, Save } from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const getRows=()=>{
  const sesData = [JSON.parse(sessionStorage.getItem("user"))];
  return (sesData);
  };


export default function User() {  
  const [rows, setRows] = React.useState(getRows);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const navigate = useNavigate();

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
      var confirmation= window.confirm("Are you sure you want to delete this user?");
      if(confirmation){
      setRows(rows.filter((row) => row.userid !== id));
      rows.map((row)=> row.userid === id ? 
      deleteUser(row)
      .then(r=>{        
        let x =JSON.parse(sessionStorage.getItem('user'));
        if(x.username===row.username){
        sessionStorage.removeItem('user');
        navigate('/Home');
        }
      }
        ).catch(r=>{ console.log(r);
          alert("Something went wrong please try again")})
      : null);
        }
        else{
          alert("User not deleted");
        }
    };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.userid === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.userid === newRow.userid ? updatedRow : row)));

   const res= updateUser(updatedRow)
console.log(res);
    return updatedRow;
  };

  const columns = [
    { field: 'username', headerName: 'Name', width: 180, editable: true },
    { field: 'email', headerName: 'Email', type: 'string', editable: true,  width:200 },
    // {
    //   field: 'password',
    //   headerName: 'Password',
    //   type: 'string',
    //   width: 180,
    //   editable: true,
    // },
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
  ];

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
       <h1>User Information</h1>
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        getRowId={(row) => row.userid}   
        
        experimentalFeatures={{ newEditingApi: true }}
      />
      </Box>
    
  );
}
