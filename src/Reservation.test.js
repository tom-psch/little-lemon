import { render, screen } from "@testing-library/react";
import Reservation from "./Reservation";
import { LoginProvider } from './LoginContext';
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";
import { initializeTimes } from "./App";

const testingArray = initializeTimes();

const dispatch = jest.fn();
const formSubmit = jest.fn();


describe("Reservation Form", () => {

    beforeEach(() => {
        render(
        <LoginProvider>
            <Reservation availableTimes={testingArray} dispatch={dispatch} submitForm={formSubmit}/>
        </LoginProvider>
        );
    })
test("Renders the Reservation heading", () => {
    const headingElement = screen.getByText("Reserve a table");
    expect(headingElement).toBeInTheDocument();
});

test("Form fields render on screen", () => {
    const name = screen.getByLabelText("Name");
    const phone = screen.getByLabelText("Phone number");
    const day = screen.getByTestId("daySel");
    const time = screen.getByTestId("timeSel");
    const ocassion = screen.getByLabelText(/occasion/i);
    const people = screen.getByLabelText(/number of people/i);
    const cancel = screen.getByLabelText(/policy/i);
    const submit = screen.getByRole("button",/complete/i);

    expect(name).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(day).toBeInTheDocument();
    expect(time).toBeInTheDocument();
    expect(ocassion).toBeInTheDocument();
    expect(people).toBeInTheDocument();
    expect(cancel).toBeInTheDocument();
    expect(submit).toBeInTheDocument();
});

test("User can submit form", async () => {
    const name = screen.getByLabelText("Name");
    const phone = screen.getByLabelText("Phone number");
    const day = screen.getByTestId("daySel");
    const time = screen.getByTestId("timeSel");
    const ocassion = screen.getByLabelText(/occasion/i);
    const people = screen.getByLabelText(/number of people/i);
    const cancel = screen.getByLabelText(/policy/i);
    const submit = screen.getByRole("button",/complete/i);

    const selectedDay = new Date().toISOString().split("T")[0];

    await act(() => {
        userEvent.type(name, "Tom");
        userEvent.type(phone, "1231231231");
        userEvent.type(day,selectedDay);
        userEvent.selectOptions(time, testingArray[2]);
        userEvent.selectOptions(ocassion,["Birthday"]);
        userEvent.type(people,"{backspace}5");
        userEvent.click(cancel);
        userEvent.click(submit);
    });

    const values = {
    daySel: selectedDay,
    timeSel: testingArray[2],
    name: "Tom",
    phone: "1231231231",
    occasion: "birthday",
    people: 5,
    cancel: true,
    }

    expect(formSubmit).toHaveBeenCalledWith(values, expect.any(Object));
});

test("HTML5 field validations", () => {
    const name = screen.getByLabelText("Name");
    const phone = screen.getByLabelText("Phone number");
    const day = screen.getByTestId("daySel");
    const today = new Date().toISOString().split('T')[0];
    const time = screen.getByTestId("timeSel");
    const ocassion = screen.getByLabelText(/occasion/i);
    const people = screen.getByLabelText(/number of people/i);
    const cancel = screen.getByLabelText(/policy/i);

    expect(name).toHaveAttribute("required")
    expect(name).toHaveAttribute("minLength","3")
    expect(phone).toHaveAttribute("required")
    expect(day).toHaveAttribute("min",today)
    expect(time).toHaveAttribute("required")
    expect(ocassion).toHaveAttribute("required")
    expect(people).toHaveAttribute("required")
    expect(people).toHaveAttribute("min","1")
    expect(people).toHaveAttribute("max","6")
    expect(people).toHaveAttribute("step","1")
    expect(cancel).toHaveAttribute("required")
});

test("JavaScript form validations", async () => {
    const name = screen.getByLabelText("Name");
    const phone = screen.getByLabelText("Phone number");
    const day = screen.getByTestId("daySel");
    const time = screen.getByTestId("timeSel");
    const ocassion = screen.getByLabelText(/occasion/i);
    const people = screen.getByLabelText(/number of people/i);
    const cancel = screen.getByLabelText(/policy/i);
    const submit = screen.getByRole("button",/complete/i);

    const today = new Date().toISOString().split('T')[0];


    await act(() => {
        userEvent.type(name, "To"); //Invalid name input
        userEvent.type(phone, "123"); //Invalid phone number input
        userEvent.type(day,"2026-01-01"); //Invalid day input
        userEvent.click(time); //clicking in other field
    });
    const error1 = screen.getByText(/please input at least 3 characters/i);
    const error2 = screen.getByText(/phone number is not valid/i);
    const error3 = screen.getByText(/invalid day/i);

    expect(error1).toBeInTheDocument();
    expect(error2).toBeInTheDocument();
    expect(error3).toBeInTheDocument();

    await act(() => {
        userEvent.type(day,today); //Valid day input to enable time selection
        userEvent.click(time); //Invalid time (no selection)
        userEvent.click(phone); //clicking in other field
        userEvent.click(ocassion); //Invalid ocassion (no selection)
        userEvent.click(phone); //clicking in other field
        userEvent.type(people,"8"); //Invalid people quantity 
        userEvent.click(cancel); //Confirm agreement
        userEvent.click(phone); //clicking in other field
        userEvent.click(cancel); //Unconfirm agreement
    });
    const error4 = screen.getByText(/select time/i);
    const error5 = screen.getByText(/more than 6 guests/i);
    const error6 = screen.getByText(/agree to continue/i);

    expect(error4).toBeInTheDocument();
    expect(error5).toBeInTheDocument();
    expect(error6).toBeInTheDocument();
    expect(submit).toHaveAttribute("disabled");
});
});