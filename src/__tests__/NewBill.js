import { screen } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import e from "express";
import { bills } from "../fixtures/bills.js";
import userEvent from "@testing-library/user-event";
import { ROUTES } from "../constants/routes.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = NewBillUI({ data: [] });
      document.body.innerHTML = html;
      //to-do write expect expression
    });
    test("When I submit new I should be redirected to the bills Page", () => {
      const onNavigate = (pathname) => {
        document.body.innertHTML = ROUTES(pathname);
      };
      Object.defineProperty(window, "localStorage", {
        value: localStorageMock,
      });
      window.localStorage.setItem(
        "user",
        JSON.stringify({
          type: "Employee",
        })
      );
      const newBill = new NewBill({
        document,
        onNavigate,
        firestore: null,
        localStorage: window.localStorage,
      });
      const html = NewBillUI();
      document.body.innerHTML = html;

      const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));

      const submitBtn = screen.getByTestId("form-new-bill");

      submitBtn.addEventListener("click", handleSubmit);
      userEvent.click(submitBtn);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
