import React, {useState, useEffect} from "react";
import CustomizedCard from '../../components/atoms/CustomizedCard/CustomizedCard';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AddReactionIcon from '@mui/icons-material/AddReaction';
import SummarizeIcon from '@mui/icons-material/Summarize';
import { useNavigate } from 'react-router-dom';
import HeaderWithLogout from '../../pages/Header/HeaderWithLogout';
import {decode as base64_decode, encode as base64_encode} from 'base-64';
import '../../style/style.css';

const NavigationTiles = ({
api
}) => {
  let navigate = useNavigate();
  const [adminloggedin, setadminloggedin] = useState();
  const [employees, setemployees] = useState();
  const [employeearray, setemployeearray] = useState();
    useEffect(() => {
      // setadminloggedin(window.localStorage.getItem('adminloggedin'));

      var user = window.localStorage.getItem('adminloggedin');
      setadminloggedin(base64_decode(user))
    }, []);
    useEffect(()=>{
      getemployeesonly();
    },[])
    const getemployeesonly = () => {
      api.get('/employees/getemployeesonly')
      .then((res) => {
          setemployees(res.data);
      })
  }
  useEffect(()=>{
    var array = [];
    if(employees){
      employees.map((data)=>{
        array.push(data.username);
      })
    }
    setemployeearray(array);
  },[employees])
  return (
    <nav>
      <div>
        <HeaderWithLogout />
      </div>
      <div className="container">
        <div className="row rowcontainer">
          <div className=" col-md-6 col-sm-6">
            <CustomizedCard
              onClick={() => {
                navigate('/viewinvoice')
              }}
              cardname={<ReceiptIcon className="navigationicon" />}
              cardlabel="View Invoice"
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <CustomizedCard
              onClick={() => {
                navigate('/addcustomerpage')
              }}
              cardlabel="customer management"
              cardname={<AddReactionIcon className="navigationicon" />}
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <CustomizedCard
              onClick={() => {
                navigate('/generateinvoice')
              }}
              cardlabel="generate invoice"
              cardname={<ReceiptIcon className="navigationicon" />}
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <CustomizedCard
              onClick={() => {
                navigate('/generatereport')
              }}
              cardlabel="generate report"
              cardname={<SummarizeIcon className="navigationicon" />}
            />
          </div>
          {
            employeearray && employeearray.length &&
            (!(employeearray.includes(adminloggedin)) && adminloggedin == "Admin")
            ? 
            <div className="col-md-6 col-sm-6">
              <CustomizedCard
                onClick={() => {
                  navigate('/employeemanagement')
                }}
                cardlabel="Employee Management"
                cardname={<SummarizeIcon className="navigationicon" />}
              />
            </div>
            : null
          }
        </div>
      </div>
    </nav>
  );
}
export default NavigationTiles;