import { fireEvent, screen } from "@testing-library/dom";
import NewBillUI from "../views/NewBillUI.js";
import NewBill from "../containers/NewBill.js";
import { localStorageMock } from "../__mocks__/localStorage.js";
import userEvent from "@testing-library/user-event";
import { ROUTES } from "../constants/routes.js";

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
    });

    describe("and a file is uploaded", () => {
      test("The file should be registered", () => {
        const onNavigate = (pathname) => {
          document.body.innertHTML = ROUTES(pathname);
        };

        const firestore = null;

        document.body.innerHTML = NewBillUI();

        const newBill = new NewBill({
          document,
          onNavigate,
          firestore: firestore,
          localStorage: window.localStorage,
        });

        const handleChange = jest.fn((e) => newBill.handleChangeFile(e));
        const file = screen.getByTestId("file");

        file.addEventListener("change", handleChange);

        userEvent.upload(file);

        expect(handleChange).toBeCalled();
        expect(file).toBeTruthy();
      });
    });

    describe("When I submit the form", () => {
      // test("An object should be created", () => {
      //   const onNavigate = (pathname) => {
      //     document.body.innertHTML = ROUTES(pathname);
      //   };

      //   document.body.innerHTML = NewBillUI();

      //   const newBill = new NewBill({
      //     document,
      //     onNavigate,
      //     firestore: null,
      //     localStorage: window.localStorage,
      //   });

      //   const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));
      //   const submitBtn = screen.getByTestId("form-new-bill");

      //   const expectedBill = {
      //     type: "Transports",
      //     name: "bill",
      //     amount: 1,
      //     date: "2021-01-01",
      //     vat: 20,
      //     pct: 10,
      //     commentary: "",
      //     fileName: "bill.jpg",
      //     fileURL: "https://test/test.jpg",
      //   };

      //   newBill.createBill = (newBill) => newBill;

      //   screen.getByTestId("expense-type") = expectedBill.type;
      //   screen.getByTestId("expense-name") = expectedBill.name;
      //   screen.getByTestId("amount") = expectedBill.amount;
      //   screen.getByTestId("datepicker") = expectedBill.date;
      //   screen.getByTestId("vat") = expectedBill.vat;
      //   screen.getByTestId("pct") = expectedBill.pct;
      //   screen.getByTestId("commentary") = expectedBill.commentary;

      //   newBill.fileURL = expectedBill.fileURL
      //   newBill.fileName = expectedBill.fileName

      //   submitBtn.addEventListener("click", handleSubmit);
      //   fireEvent.click(submit),
      //   userEvent.click(submitBtn);
      //   expect(handleSubmit).toHaveBeenCalled();
      // });

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
