import React from 'react'
import CustumerMenu from '../../../components/CustomerPage/CustomerMenu/CustumerMenu';
import MyOrders from '../../../components/CustomerPage/CustomerHistory/MyHistory';

function MyHistory() {
  
    return (
        <>
          <div className="container-fluid admin-pages">
            <div className="row">
              <div className="col-md-3 admin-left-side">
                <CustumerMenu/>
              </div>
              <div className="col-md-9 admin-right-side">
                <MyOrders/>
              </div>
            </div>
          </div>
        </>
      );
  
}

export default MyHistory