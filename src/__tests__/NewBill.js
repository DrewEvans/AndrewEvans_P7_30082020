import { screen } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import e from "express";
import { bills } from "../fixtures/bills.js";
import userEvent from "@testing-library/user-event";
import { ROUTES } from "../constants/routes.js";
import firebase from "../__mocks__/firebase.js";

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = NewBillUI({ data: [] });
      document.body.innerHTML = html;
      //to-do write expect expression
    });

    test("A Form should be rendered", () => {
      document.body.innerHTML = NewBillUI();
      const form = screen.getByTestId("form-new-bill");
      expect(form).toBeTruthy();
      expect(form.length).toEqual(9);
    });

    describe("When I submit the form", () => {
      test("An object should be created", () => {
        const onNavigate = (pathname) => {
          document.body.innertHTML = ROUTES(pathname);
        };

        document.body.innerHTML = NewBillUI();

        const newBill = new NewBill({
          document,
          onNavigate,
          firestore: null,
          localStorage: window.localStorage,
        });

        const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));
        const submitBtn = screen.getByTestId("form-new-bill");

        /**
         * todo: Validate field values, expected(newBill).toMatch(tempValidBill)  Value on create
         */

        submitBtn.addEventListener("click", handleSubmit);
        userEvent.click(submitBtn);
        expect(handleSubmit).toHaveBeenCalled();

        newBill.createBill = (newBill) => newBill;
      });

      test("I should be redirected to the bills Page", () => {
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

        const html = NewBillUI({});
        document.body.innerHTML = html;

        const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));

        const submitBtn = screen.getByTestId("form-new-bill");

        submitBtn.addEventListener("click", handleSubmit);

        userEvent.click(submitBtn);
        expect(handleSubmit).toHaveBeenCalled();
      });
    });
  });
});
