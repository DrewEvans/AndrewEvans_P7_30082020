import { screen } from "@testing-library/dom";
import BillsUI from "../views/BillsUI.js";
import { bills } from "../fixtures/bills.js";
import Bills from "../containers/Bills.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import { ROUTES } from "../constants/routes.js";
import userEvent from "@testing-library/user-event";

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", () => {
      const html = BillsUI({ data: [] });
      document.body.innerHTML = html;
      //to-do write expect expression
    });
    test("Then bills should be ordered from earliest to latest", () => {
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;
      const dates = screen
        .getAllByText(
          /^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i
        )
        .map((a) => a.innerHTML);
      const antiChrono = (a, b) => a - b;
      const datesSorted = [...dates].sort(antiChrono);
      expect(dates).toEqual(datesSorted);
    });
  });
  describe("When I am on Bills page but it is loading", () => {
    test("Then, Loading page should be rendered", () => {
      const html = BillsUI({ loading: true });
      document.body.innerHTML = html;
      expect(screen.getAllByText("Loading...")).toBeTruthy();
    });
  });
  describe("When I am on Bills page but back-end sent error msg", () => {
    test("Then Error page should be rendered", () => {
      const html = BillsUI({ error: "Some error message" });
      document.body.innerHTML = html;
      expect(screen.getAllByText("Erreur")).toBeTruthy();
    });
  });
  describe("When I am bills page and I click add a new bill button", () => {
    test("user Should be directed to new bill form", () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES(pathname);
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

      const bills = new Bills({
        document,
        onNavigate,
        firestore: null,
        localStorage: window.localStorage,
      });
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;

      const handleNewBill = jest.fn((e) => bills.handleClickNewBill(e));

      const newBillButton = screen.getByTestId("btn-new-bill");

      newBillButton.addEventListener("click", handleNewBill);
      userEvent.click(newBillButton);
      expect(handleNewBill).toHaveBeenCalled();
    });
  });
  describe("If bills are present and user clicks on the eye Icon", () => {
    test("modal of the image should appear", () => {
      const onNavigate = (pathname) => {
        document.body.innerHTML = ROUTES({ pathname });
      };
      const html = BillsUI({ data: bills });
      document.body.innerHTML = html;

      const bill = new Bills({
        document,
        onNavigate,
        firestore: null,
        localStorage: window.localStorage,
      });

      const eye = screen.getAllByTestId("icon-eye")[0];
      const modal = document.querySelector(".modal");
      const displayModal = ($.fn.modal = jest.fn());

      userEvent.click(eye);
      expect(displayModal).toBeCalled();
      expect(modal).toBeTruthy();
    });
  });
});
