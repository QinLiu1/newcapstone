import React from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import Region from './Region.js';

import Grid from '@material-ui/core/Grid';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Divider from '@material-ui/core/Divider'
import Calendar from '../Components/Calender';



const AutoSearch = (props) =>{

   //Splits the csv back into a javascript array
    var options = Region.split(",");
    var travelDates =""


    const onChangeHandler = (evt) =>{
        if(evt.keyCode === 13){
            props.history.push(`/map/${evt.target.value}/${travelDates}`) 
        }
    }

    const callBackCalendarData = (data) =>{
        travelDates=""
        if(data != null){
        for(var i =0; i <data.length;i++){
            if(i != 1){
                travelDates += data[i].getDate()+"."+(data[i].getMonth()+1)+"."+data[i].getFullYear()+"-"
            }else{
                travelDates +=data[i].getDate()+"."+(data[i].getMonth()+1)+"."+data[i].getFullYear() 
            } 
        }
    }
        
        console.log(travelDates);
    }
  

    return(
        <React.Fragment>
            <Grid item>
                <LocationOnIcon/>
            </Grid>
            <Grid item>
                <Autocomplete
                        autoComplete= {true}
                        autoSelect ={true}
                        filterSelectedOptions= {true}
                        options={options}
                        style={{ width: 300 }}
                        onChange={onChangeHandler}
                        renderInput={(params) => 
                        <TextField {...params} label="Where to?" onChange={onChangeHandler}/>
                        }
                    />

            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item >
                <Calendar callBackCalendarData={callBackCalendarData} />
            </Grid>

        </React.Fragment>
    )

}


export default AutoSearch