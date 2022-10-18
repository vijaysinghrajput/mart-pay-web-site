import React, { Component, useEffect } from 'react';
import ContextProvider from './context/contextProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './page/HomePage';
import HomePageSeo from './page/HomePageSeo';

import LoginPage from './page/LoginPage';

import ChooseAreaPage from './page/ChooseAreaPage';
import AccountPage from './page/AccountPage';
import ConditionPage from './page/ConditionPage';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import Verification from './component/Authentication/Verification';
import ProductsBySubcategoryPage from './page/ProductsBySubcategoryPage';
import CartPage from './page/CartPage';
import ProductDetailsPage from './page/ProductDetailsPage';
import CategoryPage from './page/CategoryPage';
import AccountPageApp from './page/AccountPageApp';
import NotFoundPage from './page/NotFoundPage';
import SeoKeyWord from './component/SeoKeyWord'
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import URL from './URL'
import SearchPage from './page/SearchPage';
import { OrderSuccessFull } from './component/Cart/OrderSuccessfull';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import $ from 'jquery';
import Select, { components } from "react-select";

import Cookies from 'universal-cookie';
import { RiTruckLine } from 'react-icons/ri';
const cookies = new Cookies();


class App extends Component {


  constructor(props) {
    super(props);
    this.state = {
      showAreaModel: false,
      storeCategorysData: [],
      storeProductsData: [],
      store_delivery_city: [],
      store_delivery_area: [],
      seo_area: [],
      keywords: [],
      store_id: null,
      store_delivery_city_name: 'Gorakhpur',
      store_delivery_area_name: null,
    }
  }

  async CityHandleChange(SelectCityData) {

    console.log('SelectCityData', SelectCityData.city)
    await this.setState({ store_delivery_city_name: SelectCityData.city, store_delivery_area_name: null }, () => {
      this.FetchDeliveryArea(this.state.store_delivery_city_name)
    });

    console.log('SelectCity', this.state.store_delivery_city_name)
    // this.componentDidMount()

  };

  async AreaHandleChange(SelectedAreaData) {
    console.log('SelectedAreaData', SelectedAreaData.area)

    await this.setState({ store_delivery_area_name: SelectedAreaData.area, store_id: SelectedAreaData.store_id, storeCategorysData: [], storeProductsData: [] }, () => {
      this.fetchReloder()
    });


  };


  async componentDidMount() {
    // cookies.remove("isAreaDecided");

    const store_id = cookies.get("adminStoreId");
    console.log("store_id", store_id)
    this.setState({ store_id })

    this.FetchDeliveryCity();
    this.fetchReloder()
  }

  FetchDeliveryCity() {
    fetch(URL + "/APP-API/App/getDeliveryCity", {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ store_delivery_city: responseJson.store_delivery_city, store_delivery_city_name: responseJson.store_delivery_city[0].city })
        this.FetchDeliveryArea(responseJson.store_delivery_city[0].city)
      })

      .catch((error) => {
        //  console.error(error);
      });
  }

  FetchDeliveryArea(city_name) {
    fetch(URL + "/APP-API/App/getDeliveryArea", {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }, body: JSON.stringify({ city_name: city_name })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({ store_delivery_area: responseJson.store_delivery_area })
      })
      .catch((error) => {
        //  console.error(error);
      });
  }



  fetchReloder() {
    fetch(URL + "/APP-API/App/getNavigationSeo", {
      method: 'POST',
      header: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }, body: JSON.stringify({ store_id: this.state.store_id })
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          storeCategorysData: responseJson.storeCategorysData,
          storeProductsData: responseJson.storeProductsData,
          //  seo_area: responseJson.seo_area,
          //  keywords: responseJson.keywords, 
        })
        // fetchAllData(responseJson);
      })
      .catch((error) => {
        //  console.error(error);
      });
  }


  SaveAddress() {

    cookies.set('isAreaDecided', true, { maxAge: 9999999999 });
    cookies.set('deliveryArea', this.state.store_delivery_area_name, { maxAge: 9999999999 });
    cookies.set('deliveryCity', this.state.store_delivery_city_name, { maxAge: 9999999999 });
    cookies.set('adminStoreId', this.state.store_id, { maxAge: 9999999999 });


    this.componentDidMount()

  }
  render() {


    if (cookies.get('isAreaDecided') == undefined || cookies.get('isAreaDecided') == false) {
      return (
        <Modal style={{ marginTop: 30 }}
          size="lg"


          show={true} >
          <Modal.Header className='d-flex justify-content-center'>

            <div >
              <video loop="true" autoplay="autoplay" controls={false} muted>
                <source src="/img/Delivery.mp4" type="video/mp4" />
              </video>
            </div>
          </Modal.Header>

          <Modal.Body>
            <form class="mb-4">
              <div class="form-row">
                <div class="col-md-12 form-group">
                  <label class="form-label"> <label class="text-danger">*</label> Select Delivery City</label>
                  <Select

                    defaultValue={{ label: this.state.store_delivery_city_name }}
                    value={{ label: this.state.store_delivery_city_name }}


                    onChange={(e) => this.CityHandleChange(e)}
                    options={this.state.store_delivery_city}
                  />
                </div>

                <div class="col-md-12 form-group">
                  <label class="form-label"> <label class="text-danger">*</label> Select Delivery Area</label>
                  <Select
                    value={{ label: this.state.store_delivery_area_name }}
                    onChange={(e) => this.AreaHandleChange(e)}
                    options={this.state.store_delivery_area}
                  />
                </div>

                <div style={{ marginBottom: 250 }} >

                  <div className='col-12 d-flex justify-content-center mt-2'>
                    <button onClick={() => this.SaveAddress()} type="button" class="btn btn-success text-center">Shop Now</button>
                  </div>
                </div>


              </div>
            </form>
          </Modal.Body>

        </Modal>
      )
    }

    if (this.state.storeCategorysData.length) {


      // alert("main show")

      return (

        <>


          <ContextProvider>
            {/* <ChakraProvider> */}
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                {/* <Route path="/login" element={<LoginPage />} />
              <Route path="/choose-area" element={<ChooseAreaPage />} />
              <Route path="/verification" element={<Verification />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/category" element={<CategoryPage />} />
              <Route path="/search" element={<SearchPage />} /> */}
                {/* {this.state.storeCategorysData.map((item, i) => {
                return (
                  <Route path={"/" + (item.category_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/:subcatID/:subcatName"} element={<ProductsBySubcategoryPage />} />
                )
              })}
              {this.state.storeProductsData.map((item, i) => {
                return (
                  <Route path={"/" + (item.product_full_name + " delivery in gorakhpur").replace(/\s/g, "-").toLowerCase() + "/:prodID"} element={<ProductDetailsPage />} />
                )
              })} */}
                {/* USER ACCOUNT START */}
                {/* <Route path="/orderSuccess" element={<OrderSuccessFull />} />
              <Route path="/accountApp" element={<AccountPageApp />} />
              <Route path="/account" element={<AccountPage />} />
              <Route path="/notification" element={<AccountPage />} />
              <Route path="/offers" element={<AccountPage />} />
              <Route path="/orders" element={<AccountPage />} />
              <Route path="/address" element={<AccountPage />} />
              <Route path="/condition" element={<AccountPage />} />
              <Route path="/contact" element={<AccountPage />} />
              <Route path="/about" element={<ConditionPage />} />
              <Route path="/term-and-condition" element={<ConditionPage />} />
              <Route path="/privacy-and-policy" element={<ConditionPage />} />
              <Route path="/shipping-policy" element={<ConditionPage />} />
              <Route path="/return-and-refund-policy" element={<ConditionPage />} />
              <Route path="/faq" element={<ConditionPage />} />
              <Route path='*' exact={true} element={<NotFoundPage />} /> */}

                {/* USER ACCOUNT END */}

              </Routes>
            </BrowserRouter>
            {/* </ChakraProvider> */}
          </ContextProvider>



        </>

      );
    } else {
      return (
        <div >
          <div style={{ height: "100vh" }} className="d-flex justify-content-center align-items-center">
            Please Wait... <AiOutlineLoading3Quarters size={28} className="rorateMe ml-3" />
          </div>
        </div>
      )
    }
  }
}

export default App;