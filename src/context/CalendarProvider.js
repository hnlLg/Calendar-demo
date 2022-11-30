import { useReducer } from "react";
import CalendarContext, { defaultProps } from "./CalendarContext";
const CALENDAR_ACTION = {

}

const initialValues = (initial) => {
    const initialView = initial.view && initial[initial.view] ? initial.view : 'month';
    return {
        ...initial,
        view: initialView,
        dialog: false,
        mounted: false,
        selectedRange: undefined,
        fields: [...defaultProps.fields, ...(initial.fields || [])],
    };
};

const CalendarProvider = ({ initial, children }) => {
    const [state, dispatch] = useReducer((state, action) => {
        switch (action.type) {
            case "updateProps":
                return {
                    ...state,
                    ...action.payload,
                };
            case "set":
                const { name, value } = action.payload;
                return {
                    ...state,
                    [name]: value,
                };
            default: {
                return state;
            }
        }
    }, initialValues(initial));
    console.log('initial',initial)
    console.log('state',state)

    return <CalendarContext.Provider
        value={{
            ...state,
        }}
    >
        {children}
    </CalendarContext.Provider>
}

export default CalendarProvider