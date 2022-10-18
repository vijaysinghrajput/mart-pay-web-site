import React from 'react';

const NavigationMenu = (props) => {

    return (
        <>
            <nav aria-label="breadcrumb" class="breadcrumb mb-0">
                <div class="container">
                    <ol class="d-flex align-items-center mb-0 p-0">
                        <li class="breadcrumb-item"><a href="#" class="text-success">{props.backWordPage}</a></li>
                        <li class="breadcrumb-item active" aria-current="page">{props.currontPage}</li>
                    </ol>
                </div>
            </nav>
        </>
    )

}

export default NavigationMenu;