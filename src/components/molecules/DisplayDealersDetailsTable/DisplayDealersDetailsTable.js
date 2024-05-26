import React, { useState, useEffect } from "react";
import CustomizedSearchBar from "../../atoms/CustomizedSearchBar/CustomizedSearchBar";
import OpenModal from '../OpenModal/OpenModal';
import CustomizedEditIcon from "../../atoms/CustomizedEditIcon/CustomizedEditIcon";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import '../../../style/style.css';

const DisplayDealersDetailsTable = ({
    currentstatus,
    api
}) => {
    const [dealersdetailsdata, setDealersdetailsdata] = useState({});
    const [filterflag, setfilterflag] = useState(false);
    const [rowdata, setrowdata] = useState({});
    const [searchvalue, setSearchvalue] = React.useState('');
    const [changedmodalview, setChangedmodalview] = useState('');
    const [modalview, setmodalview] = useState();
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [deletedealersgst, setdeletedealersgst] = useState();
    const openevent = (e) => {
        setOpen(e)
    }
    useEffect(() => {
        if (filterflag && currentstatus) {
            gstinstatusfilterdealersdata();
        } else {
            displayDealersDetailsData();
        }
    }, [currentstatus])
    const rowdataevent = (e) => {
        setrowdata(e);
    }
    const displayDealersDetailsData = () => {
        api.get('dealers/displayDealersDetailsData')
            .then((res) => {
                setDealersdetailsdata(res.data);
                setfilterflag(true);
            })
    }
    useEffect(() => {
        if (searchvalue === "") {
            displayDealersDetailsData();
        }
    }, [searchvalue])
    const gstinstatusfilterdealersdata = () => {
        api.post('dealers/gstinstatusfilterdealersdata', {
            params: {
                status: currentstatus
            }
        })
            .then((res) => {
                setDealersdetailsdata(res.data);
            })
    }
    const searchHandle = (e) => {
        setSearchvalue(e.target.value);
    }
    const modalviewchange = () => {
        setChangedmodalview("adddealersform");
    }
    const searchclicked = () => {
        api.post('dealers/gstinstatusfilterdealersdata', {
            params: {
                proprietor_name: searchvalue,
                proprietor_phone_number: searchvalue
            }
        })
            .then((res) => {
                setDealersdetailsdata(res.data);
            })
    }
    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
      if (e.key === 'Enter') {
        searchclicked();
        e.preventDefault();
      }
    };
    const  deletesuperevent = (id) => {
        setdeletedealersgst(id);
    }
    const deleteevent = (e) => {
        if(e == "yes"){
            api.delete(`http://localhost:3000/dealers/deletefromdealersdetailstable`,
            {
                data: {
                    id: deletedealersgst
                }
            })
            .then((res) => {
                displayDealersDetailsData();
            })
        }
        
    }
    return (
        <div>
            <OpenModal
                api={api}
                modalview={modalview}
                open={open}
                openevent={openevent}
                displayDealersDetailsData={displayDealersDetailsData}
                rowdata={rowdata}
            />
            <div className="searchbarstyle">
              <input
                type="text"
                placeholder="Enterprise Name or Phone Number"
                onChange={(e)=>setQuery(e.target.value)}
              />
            </div>
            {/* <CustomizedSearchBar
                labelname="proprietor name /proprietor phone number"
                Btnname="search"
                onHandleChangeEvent={searchHandle}
                goEventClicked={searchclicked}
                onKeyPress={handleKeypress}
            /> */}
            <div className="adddealersbtnstyle">
                <CustomizedBtn
                    BtnName="Add Dealers"
                    onClick={() => {
                        setmodalview("adddealersform");
                        openevent(true);
                    }}
                />
            </div>
            <div className='table-responsive'>
                <table className="table table-striped table-bordered tablebackground">
                    <thead className="theadalter">
                        <tr>
                            <th>GSTIN Number</th>
                            <th>Enterprise Name</th>
                            <th>Enterprise Address</th>
                            <th>Proprietor Name</th>
                            <th>Proprietor Phone Number</th>
                            <th>GSTIN Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            dealersdetailsdata && dealersdetailsdata.length
                                ? dealersdetailsdata.filter((user=>
                                    user.enterprise_name.toLowerCase().includes(query) || 
                                    user.proprietor_phone_number.toString().includes(query)
                                    )).map((data, i) => (
                                    <tr key={i}>
                                        <td>{data.gstin_number}</td>
                                        <td>{data.enterprise_name}</td>
                                        <td>{data.enterprise_address}</td>
                                        <td>{data.proprietor_name}</td>
                                        <td>{data.proprietor_phone_number}</td>
                                        <td>{data.gstin_status}</td>
                                        <td>
                                            <div className="editdeletecontainer">
                                                <CustomizedEditIcon
                                                    onClick={() => {
                                                        rowdataevent(data);
                                                        setmodalview("editdealersreport");
                                                        openevent(true);
                                                    }}
                                                />
                                                <div
                                                    className="deleteiconcontainer"
                                                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                                                >
                                                    <DeleteIcon 
                                                        id="deleteicon" 
                                                        onClick={()=>(deletesuperevent(data.gstin_number))}
                                                    />
                                                </div>
                                                <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                                                        <div className="modal-content">
                                                            <div className="modal-body">
                                                                <p>Are you sure you want to delete ?</p>
                                                            </div>
                                                            <div className="modal-footer">
                                                                <div className='btnstyle'>
                                                                    <Button
                                                                        type="button"
                                                                        className="btn btn-primary"
                                                                        data-bs-dismiss="modal"
                                                                        onClick={() => (deleteevent("yes"))}  
                                                                        >
                                                                        Confirm
                                                                    </Button>
                                                                </div>
                                                                <div className='btnstyle'>
                                                                    <Button
                                                                        type="button"
                                                                        className="btn btn-secondary"
                                                                        data-bs-dismiss="modal"
                                                                        onClick={() => (deleteevent("no"))}
                                                                        >
                                                                        Cancel
                                                                    </Button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                                :
                                <tr>
                                    <td colSpan={7}>No Record!</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default DisplayDealersDetailsTable;