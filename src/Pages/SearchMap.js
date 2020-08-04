import React, { useEffect, useState } from 'react';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import Grid from '@material-ui/core/Grid';
import Map from '../Components/MapBox';
import Table from '../Components/ResortTables.js';
import Container from '@material-ui/core/Container';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Loading from '../Components/Loading'
import TopNavBar from '../Components/TopNavBar';
import Calendar from '../Components/Calender';
import AutoSearch1 from '../Components/MapSearchHeader.js';
import Button from '@material-ui/core/Button'
import { ResortDataAPI } from '../Components/APILinks'
import Hidden from '@material-ui/core/Hidden'
import Popup from "reactjs-popup";


import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
  root: {
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 80,
    maxWidth: '100%',
  },
  grid: {
    marginBottom: 20,
    marginTop: 20,
  },
  map: {
    maxWidth: '100%',
    marginTop: 0,
  }
});


const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',

    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);


const SearchMap = (props) => {
  const classes = useStyles();
  const [data, changeData] = useState()
  const [loading, isLoading] = useState(true)
  const value = props.match.params.value
  const date = props.match.params.date

  var query = {
    "$or": [{ "location.REGION_LEVEL1": value }, { "location.REGION_LEVEL2": value }, { "location.REGION_LEVEL3": value }, { "location.CITY": value }, { "activity.value.activities.activity.name": "Downhill " + value + "ng" }, { "activity.value.activities.activity.name": value },
    { "activity.value.activities.activity.name": value + " / Nightlife" }, { "activity.value.activities.activity.name": value + " / Gambling" }]
  }

  const usaOnClickHandler = () => {
    query =
    {
      "$and": [
        { "location.REGION_LEVEL1": "USA" },
        { "unit.value.unitInfo[0].kitchen": { "$exists": false } }
      ]
    }
    isLoading(true)
    fetchData();
  }
  
  const canadaOnClickHandler = () => {
    query = {
      "$and": [
        { "location.REGION_LEVEL1": "Canada" },
        { "unit.value.unitInfo[0].kitchen": { "$exists": false } }
      ]
    }
    isLoading(true)
    fetchData();
  }
  const fullPartialClickHandler = () => {
    query =
    {
      "$or":
        [
          { "location.REGION_LEVEL1": "Canada" },
          { "location.REGION_LEVEL1": "USA" },

          {
            "$and":
              [
                { "unit.value.unitInfo[0].kitchen": { "$exists": false } },
                {
                  "$or":
                    [
                      { "unit.value.unitInfo[0].bedroom.bedroomType": "2 Bedroom" },
                      { "unit.value.unitInfo[0].bedroom.bedroomType": "3 Bedroom" },
                      { "unit.value.unitInfo[0].bedroom.bedroomType": "4 Bedroom" }
                    ]
                }
              ]
          }
        ]
    }

    isLoading(true)
    fetchData();
  }
  const oneBedRoomClickHandler = () => {
    query =
    {
      "$or":
        [
    { "location.REGION_LEVEL1": value }, { "location.REGION_LEVEL2": value }, { "location.REGION_LEVEL3": value }, { "location.CITY": value }, { "activity.value.activities.activity.name": "Downhill " + value + "ng" }, { "activity.value.activities.activity.name": value },
    { "activity.value.activities.activity.name": value + " / Nightlife" }, { "activity.value.activities.activity.name": value + " / Gambling" },

          {
            "$and":
              [
                { "unit.value.unitInfo[0].kitchen": { "$exists": false } },
                {
                  "$or":
                    [
                      { "unit.value.unitInfo[0].roomFacts.bedroom.bedroomType": "1 Bedroom" },
                    ]
                }
              ]
          }
        ]
    }

    isLoading(true)
    fetchData();
  }

  const twoBedRoomClickHandler = () => {
    query =
    {
      "$or":
        [
          { "location.REGION_LEVEL1": value }, { "location.REGION_LEVEL2": value }, { "location.REGION_LEVEL3": value }, { "location.CITY": value }, { "activity.value.activities.activity.name": "Downhill " + value + "ng" }, { "activity.value.activities.activity.name": value },
    { "activity.value.activities.activity.name": value + " / Nightlife" }, { "activity.value.activities.activity.name": value + " / Gambling" },

          {
            "$and":
              [
                { "unit.value.unitInfo[0].kitchen": { "$exists": false } },
                {
                  "$or":
                    [
                      { "unit.value.unitInfo[0].bedroom.bedroomType": "2 Bedroom" },
                    ]
                }
              ]
          }
        ]
    }

    isLoading(true)
    fetchData();
  }

  const threeBedRoomClickHandler = () => {
    query =
    {
      "$or":
        [
          { "location.REGION_LEVEL1": value }, { "location.REGION_LEVEL2": value }, { "location.REGION_LEVEL3": value }, { "location.CITY": value }, { "activity.value.activities.activity.name": "Downhill " + value + "ng" }, { "activity.value.activities.activity.name": value },
    { "activity.value.activities.activity.name": value + " / Nightlife" }, { "activity.value.activities.activity.name": value + " / Gambling" },

          {
            "$and":
              [
                { "unit.value.unitInfo[0].kitchen": { "$exists": false } },
                {
                  "$or":
                    [
                      { "unit.value.unitInfo[0].roomFacts.bedroom.bedroomType": "3 Bedroom" },
                    ]
                }
              ]
          }
        ]
    }

    isLoading(true)
    fetchData();
  }


  async function fetchData() {


    await fetch(ResortDataAPI,
      {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(query)
      })
      .catch(error => console.error('ERROR: ', error))
      .then(res => res.json())
      .then(data => {
        console.log(data)
        changeData(data)
        isLoading(false)
      })
  }

  useEffect(() => {
    try {
      fetchData();
    } catch (e) {
      console.log(e)
    }


  }, [loading]);

 //set default open panel===> React.useState('panel1'); etc..
  const [expanded, setExpanded] = React.useState();

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

//set checkbox bool 
const [state, setState] = useState({
  checkedA: false,
  checkedB: false,
  checkedF: false,
  checkedG: false,
});
  
  const handleChangeCheckBoxBedRoom = (event) => {
    console.log(state)
    //setState({ ...state, [event.target.name]: event.target.checked });
    //setState(state => state[event.target.name] = event.target.checked);
    setState({ ...state, [event.target.name]: event.target.checked });
    
     if (state.checkedF === true) {
       oneBedRoomClickHandler();
    // }else if(state.checkedA === true){
    //   twoBedRoomClickHandler();
    // }else if(state.checkedB === true){
    //   threeBedRoomClickHandler();
    // }else{
    //   fetchData();
     }
    console.log(state)
    console.log(state.checkedA)
    //console.log({[event.target.name]: event.target.value})
    console.log({[event.target.name]: event.target.checked})
    //console.log(event.target.checked)
  };

  // const handleChangeCheckBoxtwoBedRoom = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  //   if (state.checkedA === false) {
  //     twoBedRoomClickHandler();
  //   }
  //   console.log(state.checkedA)
  // };

  // const handleChangeCheckBoxthreeBedRoom = (event) => {
  //   setState({ ...state, [event.target.name]: event.target.checked });
  //   if (state.checkedB === false) {
  //     threeBedRoomClickHandler();
  //   }
  //   console.log(state.checkedB)
  // };








  return (
    <React.Fragment>
      <Header />

      <TopNavBar>
        <Grid container direction="row" spacing={2}>
          <Grid item>
            <div className={classes.filter} >
              <AutoSearch1 {...props} />
            </div>
          </Grid>

          <Grid item >
            <Button variant="contained" onClick={usaOnClickHandler} >USA</Button>
          </Grid>
          <Grid item >
            <Button variant="contained" onClick={canadaOnClickHandler}>Canada</Button>
          </Grid>
          <Grid item  >
            <Button variant="contained" onClick={fullPartialClickHandler}>Full and Partial Kitchen</Button>
          </Grid>
          <Grid item  >
            <Popup contentStyle={{width: "500px"}} trigger={open => (<Button variant="contained" >
              Filters</Button>
            )}
              position="bottom"
              closeOnDocumentClick
            ><div>
                <Accordion square expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                  <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <Typography>NUMBER OF  GUESTS</Typography>
                  </AccordionSummary>
                   Bedroom Type Options:               
                  <AccordionDetails>
                    <FormGroup column>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}

                        label="Hotel"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="Studio"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="1 BedRoom"
                      />
                    </FormGroup>

                    <FormGroup column>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedA} onChange={handleChangeCheckBoxBedRoom} name="checkedA" />}
                        label="2 BedRoom"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedB} onChange={handleChangeCheckBoxBedRoom} name="checkedB" />}
                        label="3 BedRoom"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedG} onChange={handleChangeCheckBoxBedRoom} name="checkedG" />}
                        label="4+ BedRoom"
                      />
                      </FormGroup>
                  </AccordionDetails>
                  Number of Guests:
                  <AccordionDetails>
                    <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="2+"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="4+"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="6+"
                      />
                         <FormControlLabel
                        control={<Checkbox checked={state.checkedA} onChange={handleChangeCheckBoxBedRoom} name="checkedA" />}
                        label="8+"
                      />
                    </FormGroup>
                 
                  </AccordionDetails>
                </Accordion>
                <Accordion square expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                  <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                    <Typography>OTHER OPTHIOS:</Typography>
                  </AccordionSummary>
                  Resort Options:
                  <AccordionDetails>
                  <FormGroup column>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="Adults Only"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="Braile or Raised Signage"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="Elevator"
                      />
                    </FormGroup>

                    <FormGroup column>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedA} onChange={handleChangeCheckBoxBedRoom} name="checkedA" />}
                        label="Equipment For Deaf"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedB} onChange={handleChangeCheckBoxBedRoom} name="checkedB" />}
                        label="Pets Allowed"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedG} onChange={handleChangeCheckBoxBedRoom} name="checkedG" />}
                        label="Wheelchaiir Accessible"
                      />
                      </FormGroup>
                  </AccordionDetails>
                  Kitchen Options:
                  <AccordionDetails>
                    <FormGroup row>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="FullKitchen"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="MiniKitchen"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="PartialKitchen"
                      />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion>
                <Accordion square expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                  <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
                    <Typography>AREA ACTIVITIES</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                  <FormGroup column>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="Beach"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="Boating"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="Casino/Gambling"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="Cross Country Skiing"
                      />
                    </FormGroup>
                    <FormGroup column>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="Downhill Skiing"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="Entertainment/Nightlife"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="Fishing"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="Golf"
                      />
                    </FormGroup>
                    <FormGroup column>
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="Horseback Riding"
                      />
                      <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="" />}
                        label="Scuba Diving"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="Tennis"
                      />
                    <FormControlLabel
                        control={<Checkbox checked={state.checkedF} onChange={handleChangeCheckBoxBedRoom} name="checkedF" />}
                        label="Theme Park"
                      />
                    </FormGroup>
                  </AccordionDetails>
                </Accordion> </div>
            </Popup>
          </Grid>
        </Grid>
      </TopNavBar>



      <Container fixed className={classes.root}>
        <Grid container direction="row">
          {loading ? <Loading /> :
            <React.Fragment>
              <Grid item xs={12} lg={6} className={classes.grid}>
                <Table date={date} data={data} {...props} />
              </Grid>
              <Hidden only={['xs', 'sm', 'md']}>
                <br></br>
                <Grid item xs={6} className={classes.map} >
                  <Map data={data} />
                </Grid>
              </Hidden>

            </React.Fragment>
          }
        </Grid>
      </Container>

      <Footer />
    </React.Fragment>
  )
}

export default SearchMap;