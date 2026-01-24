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
});