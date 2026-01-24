import { render, screen } from "@testing-library/react";
import Reservation from "./Reservation";
import { LoginProvider } from './LoginContext';
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

const testingArray = [{
  day: "Mon., Jan. 19th, 2026",
  times: [{time: "16:00", available: true},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: true},
    {time: "20:00", available: false}]
},
{ day: "Tue., Jan. 20th, 2026",
  times: [{time: "16:00", available: false},
    {time: "17:00", available: true},
    {time: "18:00", available: false},
    {time: "19:00", available: false},
    {time: "20:00", available: true}]
}];

const dispatch = jest.fn();

// beforeEach(() => {
//     render(
//     <LoginProvider>
//         <Reservation availableTimes={testingArray} dispatch={dispatch}/>
//     </LoginProvider>
//     );
// })

describe("Reservation Form", () => {
test("Renders the Reservation heading", () => {
    render(
    <LoginProvider>
        <Reservation availableTimes={testingArray} dispatch={dispatch}/>
    </LoginProvider>
    );
    const headingElement = screen.getByText("Reserve a table");
    expect(headingElement).toBeInTheDocument();
});

test("Form fields render on screen", () => {
    act(() => {
        render(
        <LoginProvider>
            <Reservation availableTimes={testingArray} dispatch={dispatch}/>
        </LoginProvider>
        );
    })

    const name = screen.getByLabelText("Name");
    const phone = screen.getByLabelText("Phone number");
    const day = screen.getByLabelText(/daTe/i);
    const time = screen.getByLabelText(/time/i);
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
    act(() => {
        render(
        <LoginProvider>
            <Reservation availableTimes={testingArray} dispatch={dispatch}/>
        </LoginProvider>
        );
    });

    const name = screen.getByLabelText("Name");
    const phone = screen.getByLabelText("Phone number");
    const day = screen.getByLabelText(/daTe/i);
    const time = screen.getByLabelText(/time/i);
    const ocassion = screen.getByLabelText(/occasion/i);
    const people = screen.getByLabelText(/number of people/i);
    const cancel = screen.getByLabelText(/policy/i);
    const submit = screen.getByRole("button",/complete/i);


    await act(() => {
        userEvent.type(name, "Tom");
        userEvent.type(phone, "1231231231");
        userEvent.selectOptions(day,["Tue., Jan. 20th, 2026"]);
        userEvent.selectOptions(time,["17:00"]);
        userEvent.selectOptions(ocassion,["Birthday"]);
        userEvent.type(people,"{backspace}5");
        userEvent.click(cancel);
        userEvent.click(submit);
    });

    await act(()=>new Promise((resolve) => setTimeout(resolve, 2000)));
    await act(()=>expect(dispatch).toHaveBeenCalled());
    await act(()=>expect(dispatch).toHaveBeenCalledWith({
        type: "selected_day_time",
        day: "Tue., Jan. 20th, 2026",
        time: "17:00",
    }));
    expect(screen.getByText("Your booking was successful!")).toBeInTheDocument();
    expect(name).toHaveValue("");
});
});