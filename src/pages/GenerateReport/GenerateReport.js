import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TextAndSelect from '../../components/molecules/TextAndSelect/TextAndSelect';
import DisplayCustomerTable from '../../components/molecules/DisplayCustomerTable/DisplayCustomerTable';
import DisplayDeliveryReportsTable from '../../components/molecules/DisplayDeliveryReportsTable/DisplayDeliveryReportsTable';
import DisplayProductDetailsTable from '../../components/molecules/DisplayProductDetailsTable/DisplayProductDetailsTable';
import DisplayDealersDetailsTable from '../../components/molecules/DisplayDealersDetailsTable/DisplayDealersDetailsTable';
import DownloadCustomer from '../../components/molecules/Download/DownloadCustomer';
import DownloadDelivery from '../../components/molecules/Download/DownloadDelivery';
import { useNavigate } from 'react-router-dom';
import HeaderWithLogout from '../../pages/Header/HeaderWithLogout';
import '../../style/style.css';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  let navigate = useNavigate();
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}
TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}
const GenerateReport = ({
  modalview,
  api
}) => {
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const style = {
    color: 'black'
  }

  const [statusselect, setstatusselect] = React.useState(['Booked', 'Cancelled', 'Follow Up In Progress','Purchased']);
  const [deliverystatus, setDeliverystatus] = React.useState(['Delivered', 'Not Delivered', 'Cancelled']);
  const [paymentstatus, setpaymentstatus] = React.useState(['Paid', 'Pending']);
  const [productstatus, setProductstatus] = React.useState(['Available', 'Not Available'])
  const [gstinstatus, setGstinstatus] = React.useState(['Active', 'In Active']);
  const [currentstatus, setCurrentstatus] = React.useState('');
  const [currentstatusAlter, setCurrentstatusAlter] = React.useState('');
  const [tabledata, setTabledata] = React.useState({});
  const setTableDataEvent = (e) => {
    setTabledata(e);
  }
  const currentStatusEvent = (e) => {
    setCurrentstatus(e);
  }
  const currentPaymentStatusEvent = (e) => {
    setCurrentstatusAlter(e)
  }
  let navigate = useNavigate();
  const [check, setcheck] = useState(false);
    useEffect(() => {
      setcheck(JSON.parse(window.localStorage.getItem('logoutbtn')));
    }, []);
    useEffect(()=>{
      if(check == null){
        navigate('/');
      }
    },[check])
  return (
    <div>
      <div>
        <HeaderWithLogout />
      </div>
      <div className="reportcontainer">
        <div className="pageheading">
          Generate Report
        </div>
        <div className="backarrow generatereportbackarrow">
          <p onClick={() => { navigate('/main') }}><ArrowBackIcon /></p>
        </div>
        <Box sx={{ width: '100%', color: 'white' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs variant="scrollable" value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab style={style} label="Delivery Reports" {...a11yProps(0)} />
              <Tab style={style} label="Customer Follow Up Report" {...a11yProps(1)} />
              <Tab style={style} label="Product Details Report" {...a11yProps(2)} />
              <Tab style={style} label="Dealers Details Report" {...a11yProps(3)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div className='tabpanelheader'>
              <DownloadDelivery
                setTableDataEvent={setTableDataEvent}
              />
              <div classname="paymentdeliveryfiltercontainer">
                <TextAndSelect
                  currentStatusEvent={currentPaymentStatusEvent}
                  statusselect={paymentstatus}
                  selectlabelname="Payment status"
                />
                <TextAndSelect
                  currentStatusEvent={currentStatusEvent}
                  statusselect={deliverystatus}
                  selectlabelname="Delivery status"
                />
              </div>
            </div>
            <DisplayDeliveryReportsTable
              api={api}
              setTableDataEvent={setTableDataEvent}
              tabledata={tabledata}
              modalview={modalview}
              deliverystatus={currentstatus}
              paymentstatus={currentstatusAlter}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div className='tabpanelheader'>
              <DownloadCustomer
                setTableDataEvent={setTableDataEvent}
              />
              <TextAndSelect
                currentStatusEvent={currentStatusEvent}
                statusselect={statusselect}
                selectlabelname="final status"
              />
            </div>
            <DisplayCustomerTable
              api={api}
              setTableDataEvent={setTableDataEvent}
              modalview={modalview}
              tabledata={tabledata}
              currentstatus={currentstatus}
            />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <div className='tabpanelheader'>
              <TextAndSelect
                currentStatusEvent={currentStatusEvent}
                statusselect={productstatus}
                selectlabelname="final status"
              />
            </div>
            <DisplayProductDetailsTable
              api={api}
              modalview={modalview}
              currentstatus={currentstatus}
            />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <div className='tabpanelheader'>
              <TextAndSelect
                currentStatusEvent={currentStatusEvent}
                statusselect={gstinstatus}
                selectlabelname="final status"
              />
            </div>
            <DisplayDealersDetailsTable
              api={api}
              modalview={modalview}
              currentstatus={currentstatus}
            />
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
export default GenerateReport;