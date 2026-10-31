import { createSlice } from "@reduxjs/toolkit"

const getBasketFromLocalStorage = () => {
    const storage = localStorage.getItem("basket");
    if (storage != null) {
        return JSON.parse(storage);
    } else {
        return [];
    }
}

const updateLocalStorageFromBasket = (baskets) => {
    localStorage.setItem("basket", JSON.stringify(baskets));
}

const initialState = {
    baskets: getBasketFromLocalStorage(),
    totalAmount: 0
}


export const basketSlice = createSlice({
    name: "basket",
    initialState: initialState,
    reducers: {
        addBasket: (state, action) => {
            const findedBasket = state.baskets.find((basket) => basket.id == action.payload.id);
            if (findedBasket) {
                findedBasket.count++;
            } else {
                const addBasketSperad = [...state.baskets, action.payload]
                state.baskets = addBasketSperad;
            }
            updateLocalStorageFromBasket(state.baskets);
            calculateTotalAmount();

        },
        deleteProductToBasket: (state, action) => {
            const extractedBaskets = state.baskets.filter((basket) => basket.id !== action.payload);
            state.baskets = [...extractedBaskets];
            updateLocalStorageFromBasket(state.baskets);
        },
        calculateTotalAmount: (state) => {
            let sonuc = 0;
            state.baskets.map((basket) => {
                sonuc += (basket.price * basket.count);
            })
            state.totalAmount = sonuc;
        },
        incrementProduct: (state, action) => {
            const basketId = action.payload;
            const find = state.baskets.find((basket) => basket.id == basketId)
            if (find) {
                find.count++;
            }
        },
        decrementProduct: (state, action) => {
            const basketId = action.payload;
            const find = state.baskets.find((basket) => basket.id == basketId)
            if (find) {
                find.count--;
                if (find.count == 0) {
                    const extractedBaskets = state.baskets.filter((basket) => basket.id !== basketId);
                    state.baskets = [...extractedBaskets];
                    updateLocalStorageFromBasket(state.baskets);
                }
            }
        },
        clearBaskets: (state) => {
            state.baskets = [];
            updateLocalStorageFromBasket(state.baskets);
        }
    }
});

export const { addBasket, deleteProductToBasket, calculateTotalAmount, incrementProduct, decrementProduct, clearBaskets } = basketSlice.actions;
export default basketSlice.reducer;