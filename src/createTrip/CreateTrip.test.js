import { fireEvent } from "@testing-library/react";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../context/UserProvider";
import CreateTrip from "./CreateTrip";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
});

const rendering = (
    <BrowserRouter>
        <UserProvider>
            <Routes>
                <Route path="/" element={<CreateTrip />} />
            </Routes>
        </UserProvider>
    </BrowserRouter>
);

it("Make input", async() => {
    act(() => {
        render(rendering, container);
    });

    const startInput = container.querySelector("[data-testid='data-test-start']");
    const endInput = container.querySelector("[data-testid='data-test-end']");
    const dateInput = container.querySelector("[data-testid='data-test-date']");
    const timeInput = container.querySelector("[data-testid='data-test-time']");
    const imageInput = container.querySelector("[data-testid='data-test-imageUrl']");
    const carBrandInput = container.querySelector("[data-testid='data-test-carBrand']");
    const seatsInput = container.querySelector("[data-testid='data-test-seats']");
    const priceInput = container.querySelector("[data-testid='data-test-price']");

    await act(async () => {
        fireEvent.change(startInput, {target: { value: "burgas"}});      
    })
     
    await act(async () => {
        fireEvent.change(endInput, {target: { value: "pamporovo"}});   
    })

    await act(async () => {
        fireEvent.change(dateInput, {target: { value: "18.02.1988"}});   
    })

    await act(async () => {
        fireEvent.change(timeInput, {target: { value: "22:00"}});   
    })
    await act(async () => {
        fireEvent.change(imageInput, {target: { value: "https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/1:1/w_2000,h_2000,c_limit/Roadtrip-2020-GettyImages-1151192650.jpg"}});   
    })
    await act(async () => {
        fireEvent.change(carBrandInput, {target: { value: "trabant"}});   
    })
    await act(async () => {
        fireEvent.change(seatsInput, {target: { value: "2"}});   
    })
    await act(async () => {
        fireEvent.change(priceInput, {target: { value: "20"}});   
    })
    
    expect(startInput.value).toBe("burgas");
    expect(endInput.value).toBe("pamporovo");
    expect(dateInput.value).toBe("18.02.1988");
    expect(timeInput.value).toBe("22:00");
    expect(imageInput.value).toBe("https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/1:1/w_2000,h_2000,c_limit/Roadtrip-2020-GettyImages-1151192650.jpg");
    expect(carBrandInput.value).toBe("trabant");
    expect(seatsInput.value).toBe("2");
    expect(priceInput.value).toBe("20");
});

it(`Fetch check`, async () => {
    const fakeTrip = {
       start: "dobrich",
       end: "tutrakan",
       data: "18.02.1988",
       time: "20:00",
       carImg: "https://media.cntraveler.com/photos/5edfc029b16364ea435ca862/1:1/w_2000,h_2000,c_limit/Roadtrip-2020-GettyImages-1151192650.jpg",
       carBrand: "trabant",
       seats: "2",
       price: "20",
       description: "ddadadadadadadadadada",
       owner: "asen@abv.bg"
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(fakeTrip),
        }),
    );

    act(() => {
        render(rendering, container);
    });

   
});