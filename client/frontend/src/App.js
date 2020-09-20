import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import logo from './logo.svg';
import './App.css';


const styles = theme => ({
  root: {
    background: "blue",
  },
  whiteColor: {
    color: "white"
  }
});

export default function App() {
  const classes = makeStyles();
  const [age, setTopic] = React.useState('');

  const handleChange = (event) => {
    setTopic(event.target.value);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {/* <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <FormControl className={classes.formControl}>
          <InputLabel id="input-label">Age</InputLabel>
          <Select
            labelId="input-label"
            id="input-label-1"
            value={age}
            onChange={handleChange}
            color="white"
            classes={{
              root: classes.whiteColor,
              icon: classes.whiteColor
            }} 
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
          <FormHelperText>Some important helper text</FormHelperText>
        </FormControl>
      </header>
    </div>
  );
}
