import React from 'react';

const OshanContainer = (props) => {

    return (
        <>
            <section class="pb-4 osahan-main-body">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-lg-12">
                            <div class="osahan-home-page">
                                <div class="osahan-body">
                                    {props.children}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )

}

export default OshanContainer;