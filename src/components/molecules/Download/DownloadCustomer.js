import React, { useState } from 'react';
import CustomizedText from '../../atoms/CustomizedText/CustomizedText';
import CustomizedDownload from '../../atoms/CustomizedDownload/CustomizedDownload';
import CustomizedDatepicker from '../../atoms/CustomizedDatepicker/CustomizedDatepicker';
import SearchIcon from '@mui/icons-material/Search';
import moment from 'moment';
import axios from 'axios';
const DownloadCustomer = ({setTableDataEvent}) => {
  const [fromselecteddate, fromsetselecteddate] = useState('');
  const [toselecteddate, tosetselecteddate] = useState('');
  
  const fromselecteddateevent = (e) => {
    fromsetselecteddate(e);
  }
  const toselecteddateevent = (e) => {
    tosetselecteddate(e);
  }
  const searchbuttonclicked = () => {
    axios.post('http://localhost:3000/customer/customizeddatefetchcustomerdata',{
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
    axios.post('http://localhost:3000/customer/customizeddatefetchcustomerdata',{
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

    axios.post('http://localhost:3000/customer/customizeddatefetchcustomerdata',{
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
    axios.post('http://localhost:3000/customer/customizeddatefetchcustomerdata',{
      params:{
        fromdate:fromdate,
        todate:todate
      }
    })
    .then((res)=>{
      setTableDataEvent(res.data);
    })
  }
  const todaysearchclicked = () => {
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
    curr = curr.toString();
    curr = curr.split(" "); 
    curr = curr[3]+"-"+months[curr[1]]+"-"+curr[2];
    axios.post('http://localhost:3000/customer/todaydatefetchcustomerdata',{
      params:{
        currentdate:curr
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
          <SearchIcon className='searchicon' onClick={searchbuttonclicked} />
        </div>
        <div>
          <span className='atagfirst'>
            <a href='#' onClick={weeklysearchclicked} >Weekly</a> 
          </span>
          <span className='atagsecond'>
            <a href='#' onClick={monthlysearchclicked} >Monthly</a>
          </span>
          <span className='atagthird'>
            <a href='#' onClick={yearlysearchclicked} >Yearly</a>
          </span>
          <span className='atagfourth'>
            <a href='#' onClick={todaysearchclicked} >Today's Follow Up Call</a>
          </span>
        </div>
        </div>

    );
}
export default DownloadCustomer;