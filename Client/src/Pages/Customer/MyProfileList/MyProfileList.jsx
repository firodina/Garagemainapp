import React from 'react'
import CustumerMenu from '../../../components/CustomerPage/CustomerMenu/CustumerMenu'
import MyProfile from '../../../components/CustomerPage/CustomerProfile/MyProfile'

function MyProfileList() {
  return (
    <>
      <div className="container-fluid admin-pages">
        <div className="row">
          <div className="col-md-3 admin-left-side">
            <CustumerMenu/>
          </div>
          <div className="col-md-9 admin-right-side">
            <MyProfile />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyProfileList