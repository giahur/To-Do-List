import * as React from 'react';
import './style.css';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import { useState } from 'react';

const DialogBox = ({
  array,
  SetArray,
  inputdata,
  SetInputData,
  bolin,
  SetBolin,
  index,
  open,
  SetOpen,
  titles,
}) => {
  let { title, description, deadline, priority } = inputdata;

  const [titleError, SetTitleError] = useState(false);
  const [titleHelper, SetTitleHelper] = useState('');
  const [descriptionError, SetDescriptionError] = useState(false);
  const [descriptionHelper, SetDescriptionHelper] = useState('');
  const [deadlineError, SetDeadlineError] = useState(false);
  const [priorityError, SetPriorityError] = useState(false);

  // Textbox updates as you type
  function data(e) {
    SetInputData({ ...inputdata, [e.target.name]: e.target.value });
  }

  function clearRadio() {
    document.getElementById('Low').checked = false;
    document.getElementById('Med').checked = false;
    document.getElementById('High').checked = false;
  }

  // Add Button
  function handleClick() {
    let validate = true;
    if (!title) {
      SetTitleError(true);
      SetTitleHelper('Title is Required!');
      validate = false;
    } else if (titles.includes(title)) {
      SetTitleError(true);
      SetTitleHelper('Title Already Used!');
      validate = false;
    } else {
      SetTitleError(false);
      SetTitleHelper('');
    }
    if (!description) {
      SetDescriptionError(true);
      SetDescriptionHelper('Description is Required!');
      validate = false;
    } else {
      SetDescriptionError(false);
      SetDescriptionHelper('');
    }
    if (!deadline) {
      SetDeadlineError(true);
      validate = false;
    } else {
      SetDeadlineError(false);
    }
    if (!priority) {
      SetPriorityError(true);
      validate = false;
    } else {
      SetPriorityError(false);
    }
    if (validate) {
      titles.push(title);
      SetArray([...array, { title, description, deadline, priority }]);
      SetInputData({ title: '', description: '', deadline: '' });
      clearRadio();
      handleClose();
      toastr.success('Task Successfully Added!');
    }
  }

  // Update Submit Button
  function updateinfo() {
    let total = [...array];
    total.splice(index, 1, { title, description, deadline, priority });
    SetArray(total);
    SetBolin(false);
    SetInputData({ title: '', description: '', deadline: '' });
    clearRadio();
    handleClose();
    toastr.success('Task Successfully Updated!');
  }

  function handleClose() {
    SetBolin(false);
    SetInputData({ title: '', description: '', deadline: '' });
    clearRadio();
    SetTitleError(false);
    SetTitleHelper('');
    SetDescriptionError(false);
    SetDescriptionHelper('');
    SetDeadlineError(false);
    SetPriorityError(false);
    SetOpen(false);
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle
        sx={{
          color: 'white',
          bgcolor: 'primary.dark',
          display: 'flex',
          alignItems: 'center',
          height: '20px',
          mb: '10px',
        }}
      >
        {bolin ? (
          <div>
            <EditIcon />
            Edit Task
          </div>
        ) : (
          <div>
            <AddCircleIcon />
            Add Task
          </div>
        )}{' '}
      </DialogTitle>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { mx: 1, width: 300, height: 80 },
        }}
      >
        {!bolin ? (
          <TextField
            type="text"
            name="title"
            value={inputdata.title}
            onChange={data}
            placeholder="Enter Title"
            error={titleError}
            helperText={titleHelper}
          />
        ) : (
          <></>
        )}
        <br />
        <TextField
          type="text"
          name="description"
          value={inputdata.description}
          onChange={data}
          placeholder="Description"
          error={descriptionError}
          helperText={descriptionHelper}
        />
        <br />
        <input
          type="date"
          name="deadline"
          value={inputdata.deadline}
          onChange={data}
          placeholder="Deadline"
        />
        <div id="red">{deadlineError ? 'Deadline Required!' : ''}</div>

        <div>
          Priority
          <br />
          <input
            type="radio"
            name="priority"
            value="Low"
            id="Low"
            onChange={data}
          />{' '}
          Low
          <input
            type="radio"
            name="priority"
            value="Med"
            id="Med"
            onChange={data}
          />{' '}
          Med
          <input
            type="radio"
            name="priority"
            value="High"
            id="High"
            onChange={data}
          />{' '}
          High
          <div id="red">{priorityError ? 'Priority Required!' : ''}</div>
        </div>
        <Button
          onClick={!bolin ? handleClick : updateinfo}
          variant="contained"
          size="small"
          sx={{ position: 'absolute', right: '50%' }}
        >
          {!bolin ? (
            <div>
              <AddCircleIcon />
              Add
            </div>
          ) : (
            <div>
              <EditIcon />
              Edit
            </div>
          )}
        </Button>
        <Button
          onClick={handleClose}
          variant="contained"
          color="error"
          size="medium"
          sx={{ position: 'absolute', right: '5%' }}
        >
          <DoDisturbIcon />
          Cancel
        </Button>
      </Box>
    </Dialog>
  );
};
export default DialogBox;
