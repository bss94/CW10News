import React, {useRef, useState} from 'react';
import {Button, Grid, TextField} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface Props {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  label: string;
}

const FileInput: React.FC<Props> = ({onChange, name, label}) => {
  const [filename, setFilename] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);

  const activateInput = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFilename(e.target.files[0].name);
    } else {
      setFilename('');
    }

    onChange(e);
  };

  return (
    <>
      <input type="file"
             name={name}
             style={{display: 'none'}}
             ref={inputRef}
             onChange={onFileChange}/>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <TextField fullWidth
                     label={label}
                     InputProps={{readOnly: true}}
                     value={filename}
                     onClick={activateInput}/>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={activateInput} sx={{height: '55px'}}>
            <SearchIcon/>
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default FileInput;
