import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import InvoiceFormat from '../InvoiceFormat/InvoiceFormat';
import AddCustomersForm from '../AddCustomersForm/AddCustomersForm';
import AddFewCustomersForm from '../AddFewCustomersForm/AddFewCustomersForm';
import CustomerInvoiceForm from '../CustomerInvoiceForm/CustomerInvoiceForm';
import DealersInvoiceForm from '../DealersInvoiceForm/DealersInvoiceForm';
import DealersDetailsForm from '../DealersDetailsForm/DealersDetailsForm';
import ProductsDetailsForm from '../ProductsDetailsForm/ProductsDetailsForm';
import DeliveryDetailsForm from '../DeliveryDetailsForm/DeliveryDetailsForm';
import AddProductForm from '../AddProductForm/AddProductForm';
import AddDealersForm from '../AddDealersForm/AddDealersForm';
import CustomerFollowUpForm from '../CustomerFollowUpForm/CustomerFollowUpForm';
import DealersInvoiceFormGenerate from '../../molecules/DealersInvoiceFormGenerate/DealersInvoiceFormGenerate';
import DealersInvoicesListForm from '../../molecules/DealersInvoicesListForm/DealersInvoicesListForm';
import EditDealersReportForm from '../../molecules/EditDealersReportForm/EditDealersReportForm';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 900,
  height: 700,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflow: "scroll"
};
const OpenModal = ({
  api,
  displayDealersDetailsData,
  displayProductDetailsData,
  displayDeliveryReportsData,
  invoiceFormData,
  modalbuttonname,
  modalview,
  rowdata,
  currentCustomerReferenceNo,
  displayCustomerFollowUpData,
  displaycustomerfollowupevent,
  custrefno,
  openinvoiceevent,
  invoiceno,
  formdisplaydata,
  dealersdata,
  deliveryinvoices,
  fetchdealersdatatoverify,
  changeevent,
  verificationstatus,
  currentInvoiceno,
  purchasestatus,
  bookingstatus,
  open,
  openevent,
  currentCustomerReferenceNoCustomerInvoice,
  setpurchasemsgevent,
  fetchinvoicesfromdelivery,
  displayBookedCustomeerDataEvent
}) => {
  const handleClose = () => {
    openevent(false);
 
    if (modalview === 'productdetailsform') {
      displayProductDetailsData();
    }
    else if (modalview === 'deliverydetailsform') {
      displayDeliveryReportsData();
    }
    else if (modalview === 'editdealersreport') {
      displayDealersDetailsData();
    }
    else if (modalview === 'addproductform') {
      displayProductDetailsData();
    }
    else if (modalview === 'adddealersform') {
      displayDealersDetailsData();
    }
    else if (modalview === 'customerfollowupform') {
      displayCustomerFollowUpData();
    }
    else if (modalview === 'customerdetailsform') {
      displaycustomerfollowupevent();
    }
    else if (modalview === 'addcustomerform') {
      displaycustomerfollowupevent();
    }
    // else if (modalview === 'dealersdetailsform') {
    //   fetchinvoicesfromdelivery();
    // }
    else {
      displayBookedCustomeerDataEvent();
    }
  };
  return (
    <div>
      <div className='modalbutton'>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {
              modalview === 'invoiceformat' &&
              <InvoiceFormat
                api={api}
                invoiceFormData={invoiceFormData}
                invoiceno={invoiceno}
              />
            }
            {
              modalview === 'customerdetailsform' &&
              <AddCustomersForm
                setpurchasemsgevent={setpurchasemsgevent}
                api={api}
                purchasestatus={purchasestatus}
                bookingstatus={bookingstatus}
                handleClose={handleClose}
                displayCustomerFollowUpData={displayCustomerFollowUpData}
                currentCustomerReferenceNo={currentCustomerReferenceNo}
                displaycustomerfollowupevent={displaycustomerfollowupevent}
              />
            }
            {
              modalview === 'addcustomerform' &&
              <AddFewCustomersForm
                api={api}
                handleClose={handleClose}
              />
            }
            {
              modalview === 'customerInvoiceForm' &&
              <CustomerInvoiceForm
                api={api}
                invoiceFormData={invoiceFormData}
                custrefno={custrefno}
                currentCustomerReferenceNoCustomerInvoice={currentCustomerReferenceNoCustomerInvoice}
                handleClose={handleClose}
              />
            }
            {
              modalview === 'DealersInvoiceForm' &&
              <DealersInvoiceForm
                api={api}
                dealersdata={dealersdata}
                invoiceFormData={invoiceFormData}
                handleClose={handleClose}
                formdisplaydata={formdisplaydata}
              />
            }
            {
              modalview === 'generatecustomerinvoiceform' &&
              <InvoiceFormat
                api={api}
                invoiceFormData={invoiceFormData}
                custrefno={custrefno}
                openinvoiceevent={openinvoiceevent}
              />
            }

            {
              modalview === 'DealersInvoiceFormGenerateFormat' &&
              <DealersInvoiceFormGenerate
                api={api}
                modalview={modalview}
                invoiceFormData={invoiceFormData}
                fetchdealersdatatoverify={fetchdealersdatatoverify}
              />
            }
            {
              modalview === "DealersInvoicesListForm" &&
              <DealersInvoicesListForm
                api={api}
                deliveryinvoices={deliveryinvoices}
                handleClose={handleClose}
              />
            }
            {
              modalview === "dealersdetailsform" &&
              <DealersDetailsForm
                fetchinvoicesfromdelivery={fetchinvoicesfromdelivery}
                api={api}
                currentInvoiceno={currentInvoiceno}
                verificationstatus={verificationstatus}
                changeevent={changeevent}
                handleClose={handleClose}
                fetchdealersdatatoverify={fetchdealersdatatoverify}
              />
            }
            {
              modalview === 'deliverydetailsform' &&
              <DeliveryDetailsForm
                handleClose={handleClose}
                rowdata={rowdata}
              />
            }
            {
              modalview === 'customerfollowupform' &&
              <CustomerFollowUpForm
                handleClose={handleClose}
                rowdata={rowdata}
              />
            }
            {
              modalview === 'productdetailsform' &&
              <ProductsDetailsForm
                handleClose={handleClose}
                rowdata={rowdata}
              />
            }
            {
              modalview === 'editdealersreport' &&
              <EditDealersReportForm
                rowdata={rowdata}
                handleClose={handleClose}
              />
            }
            {
              modalview === 'adddealersform' &&
              <AddDealersForm
                handleClose={handleClose}
              />
            }
            {
              modalview === 'addproductform' &&
              <AddProductForm
                handleClose={handleClose}
              />
            }
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
export default OpenModal;