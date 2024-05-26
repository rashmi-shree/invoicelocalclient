import React, { useEffect, useState } from "react";
import CustomizedSearchBar from "../../components/atoms/CustomizedSearchBar/CustomizedSearchBar";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import moment from 'moment';
import OpenModal from "../../components/molecules/OpenModal/OpenModal";
import '../../style/style.css';
import HeaderWithLogout from '../../pages/Header/HeaderWithLogout';
import CustomizedBtn from "../../components/atoms/CustomizedBtn/CustomizedBtn";
import FullScreenModalOne from "../../components/molecules/FullScreenModalOne/FullScreenModalOne";
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

const AddCustomerPage = ({
    api
}) => {
    let navigate = useNavigate();
    const [changedmodalview, setChangedmodalview] = useState('');
    const [customertable, setCustomertable] = useState([]);
    const [currentCustomerReferenceNo, setCurrentCustomerReferenceNo] = useState('');
    const [rowdataonbooking, setrowdataonbooking] = useState();
    const [purchasestatus, setpurchasestatus] = useState();
    const [bookingstatus, setbookingstatus] = useState();
    const [searchData, setSearchData] = useState('');
    const [modalview, setModalview] = useState('');
    const [purchasemsg, setpurchasemsg] = useState();
    const [query, setQuery] = useState('');
    const [check, setcheck] = useState(false);
    useEffect(() => {
      setcheck(JSON.parse(window.localStorage.getItem('logoutbtn')));
    }, []);
    useEffect(()=>{
      if(check == null){
        navigate('/');
      }
    },[check])
    const setpurchasemsgevent = (e) =>{
      setpurchasemsg(e)
    }
    const fetchpurchasestatusevent = (e) => {
      api.post('/delivery/getpurchasestatus', {
        params: {
          e
        }
      })
      .then((res) => {
        setpurchasestatus(res.data);
      })
    }
    const fetchbookingstatusevent = (e) => {
      api.post('/delivery/getbookingstatus', {
        params: {
          e
        }
      })
      .then((res) => {
        setbookingstatus(res.data);
      })
    }
    const currentCustomerRefNo = (e) => {
        setCurrentCustomerReferenceNo(e)
    }
    const [open, setOpen] = useState(false);
    const openevent = (e) =>{
      setOpen(e)
    }
    useEffect(() => {
        displaycustomerfollowupevent();
    }, [])
    const fetchalldatafromcust = (currentCustomerReferenceNo) => {
      api.post('/delivery/getalldataofcustomer', {
        params: {
          currentCustomerReferenceNo
        }
      })
      .then((res) => {
        const temprowdataonbooking = res.data;
          api.put('/jointables/updaterateofdeliverytableonbook', {
            params: {
              data:temprowdataonbooking
            }
          })
          .then((res)=>{
            api.post('/delivery/getstatecodefromdeliverytableonbook', {
              params: {
                data:temprowdataonbooking
              }
            })
            .then((res) => {
              const data = res.data;
              for (var i =0; i< data.length; i++){
                if (
                  (data[i].owner_company == 'SRI PARAMANANDA ENTERPRISES' && data[i].state_code === 29) ||
                  (data[i].owner_company == 'SDD ENTERPRISES' && data[i].state_code === 33)
                ){
                  api.put('/jointables/updatekarnatakagstratesdeliverytableonbook', {
                    params: {
                      data:temprowdataonbooking
                    }
                  })
                  .then((res)=>{
                    api.put('/jointables/updatefinalamountdeliverytableonbook', {
                      params: {
                        data:temprowdataonbooking
                      }
                    })
                    .then((res)=>{
                      api.put('/jointables/updatebalanceamountdeliverytableonbook',{
                        params:{
                          data:temprowdataonbooking
                        }
                      })
                      .then((res)=>{
                        api.put('/jointables/updatepaymentstatusdeliverytableonbook',{
                          params:{
                            data:temprowdataonbooking
                          }
                        })
                        .then((res)=>{
                          if(res){
                            alert("Updated successfully")
                          }
                        })
                      })
                    })
                  })
              }
              else {
                api.put('/jointables/updateotherstatesgstratesdeliverytableonbook', {
                  params: {
                    data:temprowdataonbooking
                  }
                })
                .then((res)=>{
                  api.put('/jointables/updatefinalamountdeliverytableonbook', {
                    params: {
                      data:temprowdataonbooking
                    }
                  })
                  .then((res)=>{
                    api.put('/jointables/updatebalanceamountdeliverytableonbook',{
                      params:{
                        data:temprowdataonbooking
                      }
                    })
                    .then((res)=>{
                      api.put('/jointables/updatepaymentstatusdeliverytableonbook',{
                        params:{
                          data:temprowdataonbooking
                        }
                      })
                      .then((res)=>{
                        if(res){
                          alert("Updated successfully")
                        }
                      })
                    })
                  })
                })
            }
              }
            })
          })
      })
    }
    const fetchupdateddatafromcust = (currentCustomerReferenceNo) => {
      api.post('/delivery/getalldataofcustomer', {
        params: {
          currentCustomerReferenceNo
        }
      })
      .then((res) => {
        setrowdataonbooking(res.data);
      })
    }
    const displaycustomerfollowupevent = () => {
      api.get('/customer/displayCustomerFollowUpData', {})
        .then((res) => {
          const data = res.data;
          const tempdata = [...new Set(data.map((e) => e.customer_reference_no))];
          const tabledata = tempdata.map((temp) => {
              let filterByTempData = data.filter(dataObject => dataObject.customer_reference_no === temp)
              var fixedstrings = filterByTempData[0];
              let displayString = filterByTempData.map((x) => {
                  return x.product + '-' + x.quantity + '(Nos)'
              })
              return {
                  ...fixedstrings,
                  displayDetails: displayString
              }
          })
          setCustomertable(tabledata);
        })
    }
    let finalCustomerRefNo = '';
    const generateCustomerReferenceNo = () => {
        let s1 = "CUST2022";
        let min = 0;
        let max = 1000;
        let random = Math.floor(Math.random() * (max - min + 1)) + min;
        finalCustomerRefNo = s1 + random;
    }
    generateCustomerReferenceNo();
    let finalcurrentdate = "";
    const currentDate = () => {
        let date = new Date();
        finalcurrentdate = moment(date).format('YYYY-MM-DD');
    }
    currentDate();
    useEffect(() => {
        if (searchData === "") {
            displaycustomerfollowupevent();
        }
    }, [searchData])
    const goEventClicked = () => {
      api.post('/customer/getCustomerFollowUpData', {
        params: {
          searchData
        }
      }
      )
        .then((res) => {
          const custdata = res.data;
          const tempdata = [...new Set(custdata.map((e) => e.customer_reference_no))];
          const tabledata = tempdata.map((temp) => {
              let filterByTempData = custdata.filter(dataObject => dataObject.customer_reference_no === temp)
              var fixedstrings = filterByTempData[0];
              let displayString = filterByTempData.map((x) => {
                  return x.product + '-' + x.quantity + '(Nos)'
              })
              return {
                  ...fixedstrings,
                  displayDetails: displayString
              }
          })
          setCustomertable(tabledata)
        })
    }
    return (
      <div>
        <div>
          <HeaderWithLogout/>
        </div>
        <div className="addcustpagecontainer">
          <div className="addcustpagesubcontainer">
            <div className="pageheading">
                Manage Customer Data
            </div>
            <div className="searchbarstyle">
              <input
                type="text"
                placeholder="Phone Number / Customer Name"
                onChange={(e)=>setQuery(e.target.value)}
              />
            </div>
            <div className="modalandback">
            {/* <div className='btnstyle'>
                <Button 
                    id="btn"
                    // type="button" 
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={()=>{
                      setModalview("addcustomerform");
                    }}
                    >
                        View Invoice
                </Button>
            </div> */}
            <FullScreenModalOne
              modalview={modalview}
            />
              <CustomizedBtn 
              BtnName="Add Customer"
              onClick={()=>{
                setModalview("addcustomerform");
                openevent(true);
              }}
              />
                  <OpenModal
                    api={api}
                    modalview={modalview}
                    displaycustomerfollowupevent={displaycustomerfollowupevent}
                    open={open}
                    openevent={openevent}
                    purchasestatus={purchasestatus}
                    bookingstatus={bookingstatus}
                    currentCustomerReferenceNo={currentCustomerReferenceNo}
                    setpurchasemsgevent={setpurchasemsgevent}
                />
                  <p className="backarrowcustomerpage" onClick={() => { navigate('/main') }}><ArrowBackIcon /></p>
            </div>
            <p>
                  {purchasemsg
                      ? <p>{purchasemsg}</p>
                      : <></>
                  }
              </p>
            <div className='table-responsive tableContainer'>
                <table className="table table-striped table-bordered tablebackground">
                    <thead className="theadalter">
                        <tr>
                            <th>Customer Reference Number</th>
                            <th>Enquiry Date</th>
                            <th>Customer Name</th>
                            <th>Customer Address</th>
                            <th>Phone Number</th>
                            <th>Phone Number Alter one</th>
                            <th>Phone Number Alter two</th>
                            <th>Enquired Product And Details</th>
                            <th>Comments</th>
                            <th>Follow Up Call </th>
                            <th>Final Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            customertable && customertable.length
                                ? customertable.filter((user=>
                                  user.customer_name.toLowerCase().includes(query) || 
                                  user.phone_number.toString().includes(query) ||
                                  user.phone_number_alter_one == query ||
                                  user.phone_number_alter_two == query
                                  )).map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.customer_reference_no}</td>
                                        <td>
                                            {
                                                data.enquiry_date != null ?
                                                moment(data.enquiry_date).format('YYYY-MM-DD'):
                                                data.enquiry_date
                                            }
                                        </td>
                                        <td>{data.customer_name}</td>
                                        <td>{data.customer_address}</td>
                                        <td>{data.phone_number}</td>
                                        <td>{data.phone_number_alter_one}</td>
                                        <td>{data.phone_number_alter_two}</td>
                                        <td>
                                            <ul>
                                                {
                                                    data.displayDetails
                                                        ?
                                                        data.displayDetails.map((d) => (
                                                            <li>{d}</li>
                                                        ))
                                                        : <></>
                                                }
                                            </ul>
                                        </td>
                                        <td>{data.comments}</td>
                                        <td>{
                                            data.follow_up_call != null ?
                                            moment(data.follow_up_call).format('YYYY-MM-DD'):
                                                data.follow_up_call
                                        }
                                        </td>
                                        <td>{data.final_status}</td>
                                        <td>
                                          {data.final_status == "Booked" || data.final_status == "Purchased"
                                          ? <CustomizedBtn 
                                          BtnName="View"
                                          onClick={()=>{
                                            setModalview("customerdetailsform");
                                            currentCustomerRefNo(data.customer_reference_no);
                                            fetchpurchasestatusevent(data.customer_reference_no);
                                            fetchbookingstatusevent(data.customer_reference_no);
                                            openevent(true);
                                          }}
                                          />
                                          :
                                          <div className="btndesign">
                                            <span className="cbtn"><CustomizedBtn 
                                              BtnName="Update Booking"
                                              onClick={()=>{
                                                fetchalldatafromcust(data.customer_reference_no);
                                              }}
                                              />
                                              </span>
                                              <span className="cbtn"><CustomizedBtn 
                                              BtnName="Book Order"
                                              onClick={()=>{
                                                currentCustomerRefNo(data.customer_reference_no);
                                                // fetchalldatafromcust(data.customer_reference_no);
                                                fetchupdateddatafromcust(data.customer_reference_no);
                                                setModalview("customerdetailsform");
                                                openevent(true);
                                              }}
                                              />
                                              </span>
                                          </div>
                                          }
                                        </td>
                                    </tr>
                                ))
                                : <tr>
                                    <td colSpan={12}>No Record!</td>
                                  </tr>
                        }
                    </tbody>
                </table>
            </div>
            </div>
        </div>
        </div>
    );
}
export default AddCustomerPage;