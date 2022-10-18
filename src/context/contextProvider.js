import React, { useReducer, useState, useEffect } from "react";
import Context from "./MainContext";
import { reducer } from '../reducer/reducer';
import Cookies from 'universal-cookie';
import URL from "../URL";


const cookies = new Cookies();

const ContextProvider = props => {


    const MainData = {
        isLoading: true,
        auth: {
            isUserLogin: false
        },
        storeCategoryData:[],
        storeProductsData:[],
        user: {
            user_info: {
                name: "",
                email: "",
                phone: "",
                address: "",
                provider_pic: ""
            },
        },

        banners: [],
        categories: [],
        products: [],
        condition: [],
        Storefaq: [],
        public_notification: [],

        subcategories: [],
        cartItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
        totalItems: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')).length : 0,
        totalAmount: 0,
        adminId: cookies.get("adminId"),
        store_id: cookies.get("adminStoreId"),
        delivery_area: cookies.get("deliveryArea"),
        delivery_city: cookies.get("deliveryCity"),
        website_name: "martpay.in"
    };

    const reloadData = () => {
        const store_id = cookies.get("adminStoreId");
    
        // letsCheck(store_id, MainData.adminId);
        fetchIntialData(store_id, MainData.adminId);
    }


    const storeBrandRelode = () => {

          const store_id = cookies.get("adminStoreId");
          const adminId =  MainData.adminId;
           fetch(URL + "/APP-API/Reload/StoreBrand", {
                        method: 'POST',
                        header: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({ store_id, adminId  })
                    }).then((response) => response.json())
                        .then((responseJson) => {

                            functionality.fetchAllData({ ...responseJson })
                       
                        })
                        .catch((error) => {
                          
                        });

                        storeProductRelode()

    }

    

    const storeCategoryRelode = () => {

        const store_id = cookies.get("adminStoreId");
        const adminId =  MainData.adminId;
         fetch(URL + "/APP-API/Reload/StoreCategory", {
                      method: 'POST',
                      header: {
                          'Accept': 'application/json',
                          'Content-type': 'application/json'
                      },
                      body: JSON.stringify({ store_id, adminId  })
                  }).then((response) => response.json())
                      .then((responseJson) => {

                          functionality.fetchAllData({ ...responseJson })
                     
                      })
                      .catch((error) => {
                        
                      });

                      storeProductRelode()

  }

  
  const storeProductRelode = () => {

    const store_id = cookies.get("adminStoreId");
    const adminId =  MainData.adminId;
     fetch(URL + "/APP-API/Reload/StoreProducts", {
                  method: 'POST',
                  header: {
                      'Accept': 'application/json',
                      'Content-type': 'application/json'
                  },
                  body: JSON.stringify({ store_id, adminId  })
              }).then((response) => response.json())
                  .then((responseJson) => {

                      functionality.fetchAllData({ ...responseJson })
                 
                  })
                  .catch((error) => {
                    
                  });


}

const storeBussinessRelode = () => {

    const store_id = cookies.get("adminStoreId");
    const adminId =  MainData.adminId;
     fetch(URL + "/APP-API/Reload/Store_bussiness_info", {
                  method: 'POST',
                  header: {
                      'Accept': 'application/json',
                      'Content-type': 'application/json'
                  },
                  body: JSON.stringify({ store_id, adminId  })
              }).then((response) => response.json())
                  .then((responseJson) => {

                      functionality.fetchAllData({ ...responseJson })
                 
                  })
                  .catch((error) => {
                    
                  });


}




  

    const fetchIntialData = async(store_id, adminId) => {

        
        const urls = [
            'StoreProducts', 
            'CustomerInformation',
            'StoreProductsAssetes',
            'StoreCategory',
            'StoreBrand',
            'MasterProducts',
            'VendorInformation',
            'StockInformation',
            'StoreInformation',
            'Store_bussiness_info'
        ];
          try{

            let res = await Promise.all(urls.map(e_url=>
                fetch(URL + "/APP-API/Reload/" + e_url, {
                    method: 'POST',
                    header: { 'Accept': 'application/json', 'Content-type': 'application/json' },
                    body: JSON.stringify({ store_id, adminId })
                })))
            let resJson = await Promise.all(res.map(e => e.json()))
            resJson = resJson.map(responseJson => 
                {
                    functionality.fetchAllData({ ...responseJson })
                    functionality.setGloabalLoading(false)

                }
              
                
                )
              

            console.log('true ho gaya')
          }catch(err) {
            console.log(err)
          }
        }

    const functionality = {
        fetchAllData: payload => dispatch({ type: "FETCH_ALL_DATA", payload }),
        setUserLogin: credentials => dispatch({ type: "USER_LOGIN", credentials }),
        addDataToCurrentGlobal: data => dispatch({ type: "ADD_DATA", data }),
        setGloabalLoading: data => dispatch({ type: "LOADING", data }),
        removeDataToCurrentGlobal: data => dispatch({ type: "REMOVE_DATA", data }),
        updateDataToCurrentGlobal: (data, where) => dispatch({ type: "UPDATE_DATA", data, where }),
        logOut: () => {
            cookies.remove("isUserLogin");
            cookies.remove("adminId");
            cookies.remove("adminPartnerId");
            cookies.remove("adminEmail");
            cookies.remove("adminMobile");
            cookies.remove("adminRoal");
            cookies.remove("adminStoreId");
            cookies.remove("adminStoreType");
            dispatch({ type: "LOGOUT" });
        },
        reloadData,storeBrandRelode,storeCategoryRelode,storeProductRelode,storeBussinessRelode,
 

    }

    

    // useEffect(() => {
    //     const store_id = cookies.get("adminStoreId");
    //     if (MainData.adminId) {
    //         fetchIntialData(store_id, MainData.adminId);
    //     }
    // }, [MainData.adminId]);

    useEffect(() => {
 
        const userID = cookies.get("userID");
        const store_id = cookies.get("adminStoreId");
        if (store_id) {
            fetchIntialData(store_id, MainData.adminId);
        }
        if (userID && MainData.user.user_info.name == "") {
            // getUserDetails(userID);
        }
        // fetchData();
    },  [MainData.store_id]);



    const [MainDataExport, dispatch] = useReducer(reducer, MainData);

    return (
        <Context.Provider value={{
            ...MainDataExport,
            ...functionality
        }}>
            {props.children}
        </Context.Provider>
    )
}

export default ContextProvider;