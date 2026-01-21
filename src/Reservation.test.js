import { render, screen } from "@testing-library/react";
import Reservation from "./Reservation";
import { LoginProvider } from './LoginContext';



test("Renders the Reservation heading", () => {
    const dispatch = jest.fn();
    render(
    <LoginProvider>
        <Reservation availableTimes={[]} dispatch={dispatch}/>
    </LoginProvider>
    );
    const headingElement = screen.getByText("Reserve a table");
    expect(headingElement).toBeInTheDocument();
})