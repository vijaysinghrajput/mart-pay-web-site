import React, { useContext, useEffect, useState } from 'react';
import MainData from '../../context/MainContext';
const MyAccountComp = (props) => {

    const data = useContext(MainData);
    const UserData = data.user.user_info;

    const onChange = (e) => {
        if (e.target.id === 'name') {
            this.setState({ name: e.target.value });
        } else if (e.target.id === 'phone') {
            this.setState({ phone: e.target.value });
        } else if (e.target.id === 'email') {
            this.setState({ email: e.target.value });
        }

    }


    return (


        <>

            <div class="col-lg-8 p-4 bg-white rounded shadow-sm">
                <h4 class="mb-4 profile-title">My account</h4>
                <div id="edit_profile">
                    <div class="p-0">
                        <form action="">
                            <div class="form-group">
                                <label for="exampleInputName1">Full Name</label>
                                <input onChange={onChange} type="text" class="form-control" id="name" value={UserData.name} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputNumber1">Mobile Number</label>
                                <input onChange={onChange} type="number" class="form-control" id="phone" value={UserData.phone} />
                            </div>
                            <div class="form-group">
                                <label for="exampleInputEmail1">Email</label>
                                <input onChange={onChange} type="email" class="form-control" id="email" value={UserData.email} />
                            </div>
                            <div class="text-center">
                                <button type="submit" class="btn btn-success btn-block btn-lg">Save Changes</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )

}

export default MyAccountComp;