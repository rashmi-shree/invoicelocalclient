import React,{useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CustomerInvoice from '../../components/organisms/CustomerInvoice/CustomerInvoice';
import DealersInvoice from '../../components/organisms/DealersInvoice/DealersInvoice';
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
const GenerateInvoice = ({
  modalview,
  api
}) => {
  const [value, setValue] = React.useState(0);
  const [searchData, setSearchData] = useState('');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const style = {
    color: 'black'
  }
  const onHandleChangeEvent = (event) => {
    setSearchData(event.target.value);
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
          Generate Invoices
        </div>
        <div className="backarrow generateinvoicebackarrow">
          <p onClick={() => { navigate('/main') }}><ArrowBackIcon /></p>
        </div>
        <Box sx={{ width: '100%', color: 'white' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab style={style} label="Customer Invoice" {...a11yProps(0)} />
              <Tab style={style} label="Dealers Invoice" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            <div>
              <CustomerInvoice
                api={api}
                onHandleChangeEvent={onHandleChangeEvent}
                searchData={searchData}
                modalview={modalview}
              />
            </div>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <div>
              <DealersInvoice
                api={api}
                onHandleChangeEvent={onHandleChangeEvent}
                searchData={searchData}
              />
            </div>
          </TabPanel>
        </Box>
      </div>
    </div>
  );
}
export default GenerateInvoice;

