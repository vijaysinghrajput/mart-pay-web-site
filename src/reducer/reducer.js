export const reducer = (state, action) => {
    if (action.type === "ADD_TO_CART") {
        if (!state.cartItems.find(o => o.cartId === action.payload.cartId)) {
            state.cartItems.push(action.payload);
            state.totalAmmuont = parseInt(state.totalAmmuont) + parseInt(action.payload.price);
            return {
                ...state,
                totalItems: state.totalItems + 1
            }
        } else {
            const objIndex = state.cartItems.findIndex((obj => obj.cartId === action.payload.cartId));
            state.cartItems[objIndex].itemQuant = parseInt(action.payload.itemQuant);
            state.totalAmmuont = parseInt(state.totalAmmuont) + parseInt(action.payload.price);
            return {
                ...state,
            }
        }
    }

    if (action.type === "CART_DETAILS") {
        state.cartDetails = { ...state.cartDetails, ...action.payload };
        state.isLoading = false
        return {
            ...state,
        };
    }

    if (action.type === "TOTAL_PRICE") {
        state.totalAmount = action.price;
        return {
            ...state,
        };
    }

    if (action.type === "FETCH_ALL_DATA") {
        state = { ...state, ...action.payload };
        state.isLoading = false
        return {
            ...state,
        };
    }

    if (action.type === "REMOVE_CART") {
        state.cartItems = [];
        state.cartDetails = [];
        state.totalItems = 0;
        return {
            ...state,
        };
    }

    if (action.type === "USER_LOGIN") {
        state.user = action.credentials;
        state.auth.isUserLogin = true;
        state.isLoading = false
        return {
            ...state,
        };
    }

    if (action.type === "LOGOUT") {
        state.user = {};
        state.auth.isUserLogin = false;
        state.isLoading = false
        return {
            ...state,
        };
    }
    if (action.type === "REMOVE_FROM_CART") {
        const removeByAttr = function (arr, attr, value) {
            let i = arr.length;
            while (i--) {
                if (arr[i]
                    && arr[i].hasOwnProperty(attr)
                    && (arguments.length > 2 && arr[i][attr] === value)) {
                    state.totalAmmuont = parseInt(state.totalAmmuont) - parseInt(arr[i].totalPrice);
                    state.totalItems = parseInt(state.totalItems) - parseInt(arr[i].itemQuant)
                    arr.splice(i, 1);
                }
            }
        }

        removeByAttr(state.cartItems, 'cartId', action.payload);

        return {
            ...state,
        };
    }
    if (action.type === "CLEAR_CART") {

        state.cartItems = [];
        state.totalAmmuont = 0;
        state.totalItems = 0;
        localStorage.removeItem("cartItems");
        localStorage.removeItem("totalAmmuont");

        return {
            ...state,
        };
    }

    if (action.type === "UPDATE_CART") {
        const objIndex = state.cartItems.findIndex((obj => obj.cartId === action.payload.oldCartProductId));
        const obj = state.cartItems[objIndex];
        state.totalAmmuont = parseInt(state.totalAmmuont) - parseInt(obj.totalPrice);
        state.totalItems = parseInt(state.totalItems) - parseInt(obj.itemQuant);
        state.cartItems.splice(objIndex, 1, action.payload);
        state.totalAmmuont = parseInt(state.totalAmmuont) + parseInt(action.payload.totalPrice);
        state.totalItems = parseInt(state.totalItems) + parseInt(action.payload.itemQuant);
        return {
            ...state,
        };
    }

    return state;
}