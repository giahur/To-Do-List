import * as React from 'react';
import './style.css';
import { useState } from 'react';
import DialogBox from './DialogBox';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import MenuIcon from '@mui/icons-material/Menu';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Grid from '@mui/material/Grid';

toastr.options = {
  positionClass: 'toast-bottom-right',
};

let titles = new Array();

export default function Table() {
  const [array, SetArray] = useState([]);
  const [inputdata, SetInputData] = useState({
    title: '',
    description: '',
    deadline: '',
    priority: 0,
  });
  const [bolin, SetBolin] = useState(false);
  const [index, SetIndex] = useState();
  const [open, SetOpen] = React.useState(false);

  // Action Delete Button
  function deletedata(ind) {
    let total = [...array];
    total.splice(ind, 1);
    SetArray(total);
    toastr.success('Task Successfully Deleted!');
  }

  // Action Update Button
  function updatedata(ind) {
    OpenDialogBox();
    let { title, description, deadline, priority } = array[ind];
    SetInputData({ title, description, deadline, priority });
    SetBolin(true);
    SetIndex(ind);
  }

  function OpenDialogBox() {
    SetOpen(true);
  }

  return (
    <div>
      <Card
        sx={{
          width: 'auto',
          height: 50,
          color: 'white',
          bgcolor: 'primary.dark',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={5}></Grid>
          <Grid item xs={5}>
            <MenuIcon />
            <Typography variant="button">FRAMEWORKS</Typography>
          </Grid>
          <Grid item xs={2}>
            <Button onClick={OpenDialogBox} variant="contained">
              <AddCircleIcon />
              Add
            </Button>
          </Grid>
        </Grid>
      </Card>

      <Table aria-label="simple table">
        <TableRow>
          <TableCell align="center" sx={{ color: 'gray' }}>
            Title
          </TableCell>
          <TableCell align="center" sx={{ color: 'gray' }}>
            Description
          </TableCell>
          <TableCell align="center" sx={{ color: 'gray' }}>
            Deadline
          </TableCell>
          <TableCell align="center" sx={{ color: 'gray' }}>
            Priority
          </TableCell>
          <TableCell align="center" sx={{ color: 'gray' }}>
            Is Complete
          </TableCell>
          <TableCell align="center" sx={{ color: 'gray' }}>
            Action
          </TableCell>
        </TableRow>
        <TableBody>
          {array &&
            array.map((info, ind) => {
              return (
                <TableRow key={ind}>
                  <TableCell align="center">{info.title}</TableCell>
                  <TableCell align="center">{info.description}</TableCell>
                  <TableCell align="center">{info.deadline}</TableCell>
                  <TableCell align="center">{info.priority}</TableCell>
                  <TableCell align="center">
                    {' '}
                    <input id="isComplete" type="checkbox" />{' '}
                  </TableCell>
                  <TableCell align="center">
                    <Button onClick={() => updatedata(ind)} variant="contained">
                      <EditIcon />
                      update
                    </Button>
                    <Button
                      onClick={() => deletedata(ind)}
                      variant="contained"
                      color="error"
                    >
                      <CancelIcon />
                      delete
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
      <DialogBox
        array={array}
        SetArray={SetArray}
        inputdata={inputdata}
        SetInputData={SetInputData}
        bolin={bolin}
        SetBolin={SetBolin}
        index={index}
        open={open}
        SetOpen={SetOpen}
        titles={titles}
      />
    </div>
  );
}
