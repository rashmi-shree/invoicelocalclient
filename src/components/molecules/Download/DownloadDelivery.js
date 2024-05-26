import React, { useState } from 'react';
import CustomizedText from '../../atoms/CustomizedText/CustomizedText';
import CustomizedDatepicker from '../../atoms/CustomizedDatepicker/CustomizedDatepicker';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import '../../../style/style.css';

const DownloadDelivery = ({setTableDataEvent}) => {
  const [fromselecteddate, fromsetselecteddate] = useState('');
  const [toselecteddate, tosetselecteddate] = useState('');
  
  const fromselecteddateevent = (e) => {
    fromsetselecteddate(e);
  }
  const toselecteddateevent = (e) => {
    tosetselecteddate(e);
  }
  const searchbuttonclicked = () => {
    axios.post('http://localhost:3000/delivery/customizeddatefetchdeliverydata',{
      params:{
        fromdate:fromselecteddate,
        todate:toselecteddate
      }
    })
    .then((res)=>{
      setTableDataEvent(res.data);
    })
  }
  const weeklysearchclicked = () => {
    var months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    }
    var curr = new Date; 
    var first = curr.getDate() - curr.getDay(); 
    var last = first + 6; 

    var firstday = new Date(curr.setDate(first));
    var lastday = new Date(curr.setDate(last));

    firstday = firstday.toString();
    firstday = firstday.split(" "); 
    var fromdate = firstday[3]+"-"+months[firstday[1]]+"-"+firstday[2];
    
    lastday = lastday.toString();
    lastday = lastday.split(" "); 
    var todate = lastday[3]+"-"+months[lastday[1]]+"-"+lastday[2];
    axios.post('http://localhost:3000/delivery/customizeddatefetchdeliverydata',{
      params:{
        fromdate:fromdate,
        todate:todate
      }
    })
    .then((res)=>{
      setTableDataEvent(res.data);
    })

  }
  const monthlysearchclicked = () => {
    var months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    }
    var curr = new Date; 
    var first = curr.getDate() - curr.getDay(); 
    var last = first + 6; 
    var lastday = new Date(curr.setDate(last));
    lastday = lastday.toString();
    lastday = lastday.split(" "); 
    var fromdate = lastday[3]+"-"+months[lastday[1]]+"-"+'01';
    var todate = lastday[3]+"-"+months[lastday[1]]+"-"+lastday[2];
    axios.post('http://localhost:3000/delivery/customizeddatefetchdeliverydata',{
      params:{
        fromdate:fromdate,
        todate:todate
      }
    })
    .then((res)=>{
      setTableDataEvent(res.data);
    })
  }
  const yearlysearchclicked = () => {
    var months = {
      Jan: "01",
      Feb: "02",
      Mar: "03",
      Apr: "04",
      May: "05",
      Jun: "06",
      Jul: "07",
      Aug: "08",
      Sep: "09",
      Oct: "10",
      Nov: "11",
      Dec: "12"
    }
    var curr = new Date; 
    var first = curr.getDate() - curr.getDay();
    var last = first + 6; 
    var lastday = new Date(curr.setDate(last));
    lastday = lastday.toString();
    lastday = lastday.split(" "); 
    var fromdate = lastday[3]+"-"+"01"+"-"+'01';
    var todate = lastday[3]+"-"+months[lastday[1]]+"-"+lastday[2];
    axios.post('http://localhost:3000/delivery/customizeddatefetchdeliverydata',{
      params:{
        fromdate:fromdate,
        todate:todate
      }
    })
    .then((res)=>{
      setTableDataEvent(res.data);
    })
  }
    return(
        <div className='fromtodownloadlinkcontainer'>
        <div className='fromtodownloadcontainer'>
          <div className='fromcontainer'>
            <CustomizedText textname="from :- " />
            <CustomizedDatepicker selecteddateevent={fromselecteddateevent} />
          </div>
          <div className='tocontainer'>
            <CustomizedText textname="to :-" />
            <CustomizedDatepicker selecteddateevent={toselecteddateevent} />
          </div>
          <div >
            <SearchIcon className='searchicon' onClick={searchbuttonclicked} />
          </div>
        </div>
        <div>
          <span className='atagfirst'>
            <a href='#' onClick={weeklysearchclicked} >weekly</a> 
          </span>
          <span className='atagsecond'>
            <a href='#' onClick={monthlysearchclicked} >monthly</a>
          </span>
          <span className='atagthird'>
            <a href='#' onClick={yearlysearchclicked} >yearly</a>
          </span>
        </div>
        </div>

    );
}
export default DownloadDelivery;