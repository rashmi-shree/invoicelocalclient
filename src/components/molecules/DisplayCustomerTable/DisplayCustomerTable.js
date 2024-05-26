import React, { useEffect, useState } from 'react';
import CustomizedSearchBar from '../../atoms/CustomizedSearchBar/CustomizedSearchBar';
import CustomizedDownload from '../../atoms/CustomizedDownload/CustomizedDownload';
import CustomizedPrint from '../../atoms/CustomizedPrint/CustomizedPrint';
import {CSVLink} from "react-csv";
import OpenModal from '../../molecules/OpenModal/OpenModal';
import CustomizedEditIcon from '../../atoms/CustomizedEditIcon/CustomizedEditIcon';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import moment from 'moment';


const DisplayCustomerTable = ({
    currentstatus,
    setTableDataEvent,
    tabledata,
    api
}) => {
    const [filterflag, setfilterflag] = useState(false);
    const [searchvalue, setSearchvalue] = React.useState('');
    const [rowdata, setrowdata] = useState({});
    const [modalview, setmodalview] = useState();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const openevent = (e) =>{
      setOpen(e)
    }
    useEffect(()=>{
        if (filterflag && currentstatus ){
            statusfiltercustomerdata();
        }else {
            displayCustomerFollowUpData();   
        }
    },[currentstatus])

    const headers =[
        {label:'Comments', key:'comments'},
        {label:'Customer address', key:'customer_address'},
        {label:'Customer name', key:'customer_name'},
        {label:'Customer reference No', key:'customer_reference_no'},
        {label:'Enquired product', key:'enquired_product'},
        {label:'Enquired product hsn code', key:'enquired_product_hsn_code'},
        {label:'Enquired date', key:'enquiry_date'},
        {label:'Final status', key:'final_status'},
        {label:'Follow up call', key:'follow_up_call'},
        {label:'Phone number', key:'phone_number'},
        {label:'Quantity', key:'quantity'}
      ];
      const csvReport = {
        filename:'CustomerReports.csv',
        headers:headers,
        data:tabledata
      }
    const rowdataevent = (e) => {
        setrowdata(e);
    }
    const displayCustomerFollowUpData = () => {
        api.get('customer/displayCustomerFollowUpData')
        .then((res)=>{
            setTableDataEvent(res.data);
              setfilterflag(true);
        })
    }
    useEffect(()=>{
        if (searchvalue === ""){
            displayCustomerFollowUpData();
        }
    },[searchvalue])
    const statusfiltercustomerdata = () => {
        api.post('customer/statusfiltercustomerdata',{
            params:{
                status:currentstatus
            }
        })
        .then((res)=>{
            setTableDataEvent(res.data);
        })
  }
  const searchHandle = (e) => {
    setSearchvalue(e.target.value);
  }
  const searchclicked = () => {
    api.post('customer/getCustomerFollowUpDataCustomer',{
        params:{
            searchvalue
        }
    })
    .then((res)=>{
        setTableDataEvent(res.data);
    })
  }
  const handleKeypress = (e) => {
    //it triggers by pressing the enter key
  if (e.key === 'Enter') {
    searchclicked();
    e.preventDefault();
  }
};
const [adminloggedin, setadminloggedin] = useState();
    useEffect(() => {
        var user = window.localStorage.getItem('adminloggedin');
        setadminloggedin(base64_decode(user))
      }, []);
    return(
        <div>
             <OpenModal 
                api={api}
                modalview={modalview}
                open={open}
                openevent={openevent}
                displayCustomerFollowUpData={displayCustomerFollowUpData}
                rowdata={rowdata} 
            />
            <div className="searchbarstyle">
              <input
                type="text"
                placeholder="Phone Number / Customer Name"
                onChange={(e)=>setQuery(e.target.value)}
              />
            </div>
            {/* <CustomizedSearchBar 
                labelname="customer :- phone number / name"
                Btnname="search"
                onHandleChangeEvent={searchHandle}
                goEventClicked={searchclicked}
                onKeyPress={handleKeypress}
            /> */}
            <div>
                {
                    adminloggedin == "Admin"
                    ?
                    tabledata && tabledata.length ? 
                    <CSVLink {...csvReport}><CustomizedDownload/></CSVLink> : null
                    : null
                }
                {/* <CustomizedPrint /> */}
            </div>
            <div className='table-responsive'>
                <table className='table table-striped table-bordered tablebackground'>
                    <thead className='theadalter'>
                        <tr>
                            <th>Customer Reference Number</th>
                            <th>Enquiry Date</th>
                            <th>Customer Name</th>
                            <th>Customer Address</th>
                            <th>Phone Number</th>
                            <th>Phone Number Alter One</th>
                            <th>Phone Number Alter Two</th>
                            <th>Enquired Product Hsn Code</th>
                            <th>Enquired Product</th>
                            <th>Quantity</th>
                            <th>Comments</th>
                            <th>Follow Up Call </th>
                            <th>Final Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tabledata && tabledata.length 
                            ? tabledata.filter((user=>
                                user.customer_name.toLowerCase().includes(query) || 
                                user.phone_number.toString().includes(query)
                                )).map((data, i)=>(
                                <tr key={i}>
                                <td>{data.customer_reference_no} </td>
                                <td>
                                    {
                                        data.enquiry_date != null ?
                                        moment(data.enquiry_date).format('YYYY-MM-DD'):
                                        data.enquiry_date
                                    }
                                </td>
                                <td>{data.customer_name}</td>
                                <td>{data.customer_address} </td>
                                <td>{data.phone_number} </td>
                                <td>{data.phone_number_alter_one} </td>
                                <td>{data.phone_number_alter_two} </td>
                                <td>{data.product_hsn_code} </td>
                                <td>{data.product} </td>
                                <td>{data.quantity} </td>
                                <td>{data.comments} </td>
                                <td>
                                    {
                                        data.follow_up_call != null ? 
                                        moment(data.follow_up_call).format('YYYY-MM-DD'):
                                        data.follow_up_call
                                    } 
                                </td>
                                <td>{data.final_status} </td>
                                <td>
                                <CustomizedEditIcon 
                                    onClick={()=>{
                                        rowdataevent(data);
                                        setmodalview("customerfollowupform");
                                        openevent(true);
                                    }}
                                />
                                </td>
                            </tr>
                            ))
                            : 
                                <tr>
                                    <td colSpan={12}>No Record!</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DisplayCustomerTable;