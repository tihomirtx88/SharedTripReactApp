import { fireEvent } from "@testing-library/react";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../../context/UserProvider";

import Login from "./Login";

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
                <Route path="/" element={<Login />} />
            </Routes>
        </UserProvider>
    </BrowserRouter>
);

it("initial rendering test", () => {
    act(() => {
        render(rendering, container);
    });

    const emailInput = container.querySelector("[data-testid='data-test-email']");
    expect(emailInput.value).toBe("");

    expect(container.querySelector("[data-testid='data-test-password']").value).toBe("");
    expect(container.querySelector("[data-testid='data-test-email']").value).toBe("");
});

it("Make input", () => {
    act(() => {
        render(rendering, container);
    });

    const emailIput = container.querySelector("[data-testid='data-test-email']");
    const passwordInput = container.querySelector("[data-testid='data-test-password']");

    fireEvent.change(emailIput, {target: { value: "asen@abv.bg"}});
    expect(emailIput.value).toBe("asen@abv.bg");

    fireEvent.change(passwordInput, {target: { value: "777733"}});
    expect(passwordInput.value).toBe("777733");
});

it(`Fetch check`, async () => {
    const fakeUser = {
        accessToken: "testtesttest",
    };

    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            ok: true,
            status: 200,
            json: () => Promise.resolve(fakeUser),
        }),
    );

    act(() => {
        render(rendering, container);
    });

    const emailInput = container.querySelector("[data-testid='data-test-email']");
    const passwordInput = container.querySelector("[data-testid='data-test-password']");
    const formButton = container.querySelector("[data-testid='data-test-button']");

    
    await act(async () => {
        fireEvent.change(emailInput, { target: { value: "asen@abv.bg" } });
    })
    
    await act(async () => {
        fireEvent.change(passwordInput, { target: { value: "777733" } });
    })
    

    await act(async () => {
        fireEvent.click(formButton);
    });

    expect(emailInput.value).toBe("asen@abv.bg");
    expect(passwordInput.value).toBe("777733");

    const storedToken = JSON.parse(localStorage.getItem("userInfo"));
    expect(storedToken.accessToken).toBe("testtesttest");
});
