import React from 'react';

const AccountContainer = (props) => {

    return (
        <>
            <section class="pb-4 osahan-main-body">
                <div class="container">
                    <div class="row">
                        {props.children}
                    </div>
                </div>
            </section>
        </>
    )

}

export default AccountContainer;