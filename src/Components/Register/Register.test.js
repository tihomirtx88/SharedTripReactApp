import { fireEvent } from "@testing-library/react";
import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserProvider } from "../../context/UserProvider";

import Register from "./Register";

let container = null;

beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
})

const rendering = (
    <BrowserRouter>
        <UserProvider>
            <Routes>
                <Route path="/" element={<Register />} />
            </Routes>
        </UserProvider>
    </BrowserRouter>
);

it(`Initial rendering test`, () => {
    act(() => {
        render(rendering ,container)
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
    const maleInput = container.querySelector("[data-testid='data-test-male']");

    fireEvent.change(emailIput, {target: { value: "asen@abv.bg"}});
    expect(emailIput.value).toBe("asen@abv.bg");

    fireEvent.change(passwordInput, {target: { value: "777733"}});
    expect(passwordInput.value).toBe("777733");

    fireEvent.change(maleInput, {target: { value: "male"}});
    expect(maleInput.value).toBe("male");
});

it(`Fetch check`, async () => {
    const fakeUser = {
        email: "asen@abv.bg",
        password: "777733",
        rePassword: "777733"
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
});