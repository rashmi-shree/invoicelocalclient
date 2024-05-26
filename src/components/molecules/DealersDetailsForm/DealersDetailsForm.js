import React, { useEffect, useState, useRef } from "react";
import CustomizedBtn from "../../atoms/CustomizedBtn/CustomizedBtn";
import { purchasesuccessmsg } from '../../organisms/SuccessMsg/SuccessMsg';
import { useReactToPrint } from "react-to-print";
import CustomizedPrint from '../../atoms/CustomizedPrint/CustomizedPrint';
// import CustomizedComboboxForOwner from "../../atoms/CustomizedCombobox/CustomizedCombobboxForOwner";
import axios from 'axios';
import '../../../style/style.css';
const DealersDetailsForm = ({
  rowdata,
  handleClose,
  fetchdealersdatatoverify,
  verificationstatus,
  currentInvoiceno,
  fetchinvoicesfromdelivery
}) => {
  const [updaterowdata, setUpdaterowdata] = useState();
  // const [selectedowner, setselectedowner] = useState()
  const [Rowdatadisplayed, setRowdatadisplayed] = useState();
  const [gstno, setgstno] = useState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  useEffect(() => {
    fetchalldatafromcust();
  }, [])
  const fetchalldatafromcust = () => {
    axios.post('http://localhost:3000/delivery/getalldataofcustomer', {
        params: {
          currentCustomerReferenceNo: currentInvoiceno
        }
      })
        .then((res) => {
          setRowdatadisplayed(res.data);
        })
  }
  useEffect(() => {
    if (fetchdealersdatatoverify) {
      setUpdaterowdata(fetchdealersdatatoverify);
    }
  }, [fetchdealersdatatoverify])
  const [finalverificationstatus, setfinalverificationstatus] = useState();
  useEffect(() => {
    if (verificationstatus) {
      setfinalverificationstatus(verificationstatus[0].verification_status);
    }
  }, [verificationstatus])
  const [constantinvoicedata, setconstantinvoicedata] = useState();
  useEffect(() => {
    if (fetchdealersdatatoverify) {
      const tempdata = [...new Set(fetchdealersdatatoverify.map((e) => e.customer_reference_no))];
      tempdata.map((temp) => {
        let filterByTempData = fetchdealersdatatoverify.filter(dataObject => dataObject.customer_reference_no === temp)
        var fixedstrings = filterByTempData[0];
        setconstantinvoicedata(fixedstrings);
      })
    }
  }, [fetchdealersdatatoverify])
  const submiteventclicked = (gstno) => {
    let custrefno = "";
    let statecode;
    let owner_company = "";
    Rowdatadisplayed.map((data) => {
      custrefno = data.customer_reference_no;
      statecode = data.state_code;
      owner_company= data.owner_company
    })
  //   axios.put('http://localhost:3000/customer/updatefinalstatuscustomertablepurchased',{
  //     params:{
  //         customer_reference_no: custrefno
  //     }
  // })
    axios.post('http://localhost:3000/delivery/setverificationstatus', {
      params: {
        customer_reference_no: custrefno
      }
    })
    .then((res)=>{
      axios.put('http://localhost:3000/delivery/updatepurchasestatusofdeliverytable', {
        params: {
          customer_reference_no: custrefno
        }
      })
      .then((res)=>{
        axios.put('http://localhost:3000/delivery/updateDeliveryDatafromdealersform', {
          params: {
            rowdatadisplayed: Rowdatadisplayed
          }
        })
        .then((res)=>{
          axios.post('http://localhost:3000/jointables/calculaterateofdeliveryofdealers', {
            params: {
              rowdatadisplayed: Rowdatadisplayed
            }
          })
          .then((res)=>{
            if (
              (owner_company == 'SRI PARAMANANDA ENTERPRISES' && statecode === 29) ||
              (owner_company == 'SDD ENTERPRISES' && statecode === 33)
              ) {
              axios.put('http://localhost:3000/jointables/updatekarnatakagstratesfromdealers', {
                params: {
                  rowdatadisplayed: Rowdatadisplayed
                }
              })
              .then((res)=>{
                axios.put('product/updateProductsDetailsProductDataDecrement',{
                  Rowdatadisplayed
              })
              .then((res)=>{
                axios.put('http://localhost:3000/jointables/updatefinalamountdeliveryfromdealers', {
                  params: {
                    customer_reference_no: custrefno
                  }
                })
                .then((res)=>{
                  axios.put('http://localhost:3000/jointables/updatebalanceamountdeliveryfromdealers', {
                    params: {
                      rowdatadisplayed: Rowdatadisplayed
                    }
                  })
                    .then((res) => {
                      if (res) {
                        const res = purchasesuccessmsg({});
                        alert(res.msg);
                        handleClose();
                        fetchinvoicesfromdelivery(gstno);
                      }
                    })
                })
              })
              })
            }
            else {
              axios.put('http://localhost:3000/jointables/updateotherstatesgstratesfromdealers', {
                params: {
                  rowdatadisplayed: Rowdatadisplayed
                }
              })
                .then((res) => {
                  axios.put('product/updateProductsDetailsProductDataDecrement',{
                    Rowdatadisplayed
                })
                .then((res)=>{
                  axios.put('http://localhost:3000/jointables/updatefinalamountdeliveryfromdealers', {
                    params: {
                      customer_reference_no: custrefno
                    }
                  })
                    .then((res) => {
                      axios.put('http://localhost:3000/jointables/updatebalanceamountdeliveryfromdealers', {
                        params: {
                          rowdatadisplayed: Rowdatadisplayed
                        }
                      })
                        .then((res) => {
                          if (res) {
                            const res = purchasesuccessmsg({});
                            alert(res.msg);
                            handleClose();
                            fetchinvoicesfromdelivery(gstno);
                          }
                        })
                    })
                })
                })
            }
          })
        })
      })
    })
      
      
   
  }
  
  useEffect(()=>{
    if (Rowdatadisplayed){
      Rowdatadisplayed.map((data,i)=>(
        setgstno(data.gst)
      ))
    }
  },[Rowdatadisplayed])
  const changeevent = (event, index) => {
    let updateRowDataByIndex = [...Rowdatadisplayed];
    Rowdatadisplayed.find((item, i) => {
      if (item.delivery_id === index) {
        updateRowDataByIndex[i][event.target.name] = event.target.value;
        setRowdatadisplayed(() => [...updateRowDataByIndex]);
      }
    })
  }
  // const selecteventforowner = (e) => {
  //   setselectedowner(e.label);
  //   recalldisplayProductDetailsDataforcomboboxevent(e.label);
  //   if (e.label == "SDD ENTERPRISES"){
  //     setcustomerdata({ ...customerdata, "owner_company": e.label,  "statename": {label: 'Tamil Nadu', value: 33 }})
  //   }
  //   else if (e.label == "SRI PARAMANANDA ENTERPRISES"){
  //     setcustomerdata({ ...customerdata, "owner_company": e.label,  "statename": {label: 'Karnataka', value: 29}})
  //   }
  // }
  return (
    <div>
      <div><CustomizedPrint
        onClick={handlePrint}
      />
      </div>
      <div ref={componentRef}>
        <div className="formheading">
          <h5><bold>SHREE PARAMANANDA ENTERPRISES</bold></h5>
          <p>Shop #05,Medhini Arcade,Kithaganahalli Gate,
            Opp Anna
            Building,Hosur Main Road Bangalore-560099,
            <br></br>Mobile: 9035757145/9902880851/9141070705</p>
        </div>
        <div className="pageheading">
          Purchase Order
        </div>
        <form className="formcontainer">
          {
            Rowdatadisplayed && Rowdatadisplayed.length
              ? Rowdatadisplayed.map((data, i) => (
                <>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        owner company:
                      </div>
                      <div className="formdatainputstyle">
                        {/* <CustomizedComboboxForOwner
                          comboboxdata={owner}
                          dvalue = {data.owner_company}
                          selectevent={selecteventforowner}
                        /> */}
                        <input
                          defaultValue={data.owner_company}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        customer name:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.customer_name}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        Customer address:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.customer_address}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        Invoice no:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.invoice_no}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        GST:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.gst}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        phone number:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.phone_number}
                          type="number"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        phone number (alter one):
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.phone_number_alter_one}
                          type="number"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        phone number (alter two):
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.phone_number_alter_two}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        Product:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.product}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        quantity:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.quantity}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        rate:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.rate}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        discount:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.discount}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        Rate After Extended Discount:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.extended_discount}
                          type="number"
                          onChange={(event) => changeevent(event, data.delivery_id)}
                          name="extended_discount"
                          onWheel={(e) => e.target.blur()}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        cgst:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.cgst}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        sgst:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.sgst}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        igst:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.igst}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        final amount:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.final_amount}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        balance amount:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.balance_amount}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                      <label className="formdatalabelstyle">
                          <div className="formnamestyle">
                              Payment status:
                          </div>
                          <div className="formdatainputstyle">
                              <input
                                  type="text"
                                  defaultValue={data.payment_status}
                                  readOnly
                                  disabled
                              />
                          </div> 
                      </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        advance amount:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.booking_advance_amount}
                          type="number"
                          onChange={(event) => changeevent(event, data.delivery_id)}
                          name="booking_advance_amount"
                          onWheel={(e) => e.target.blur()}
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        po number:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.po_number}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="nameandinputcontainer">
                    <label className="formdatalabelstyle">
                      <div className="formnamestyle">
                        vehicle number:
                      </div>
                      <div className="formdatainputstyle">
                        <input
                          defaultValue={data.vehicle_number}
                          type="text"
                          readOnly
                          disabled
                        />
                      </div>
                    </label>
                  </div>
                  <div className="divider"></div>
                </>
              ))
              : <p>No Record!</p>
            }
            {/* <CustomizedBtn
            BtnName="submit"
            // onClick={submiteventclicked}
            onClick={() => {
              submiteventclicked(data.gst);
          }}
          /> */}
        </form>
      </div>
      {
        finalverificationstatus == 1
          ? <p className="verificationstyle">Verification and Purchase completed!</p>
          : <div className="submitcontainee">
            <CustomizedBtn
              BtnName="submit"
              // onClick={submiteventclicked}
              onClick={()=>{
                submiteventclicked(gstno);
              }}
            />
          </div>
      }
    </div>
  )
}
export default DealersDetailsForm;