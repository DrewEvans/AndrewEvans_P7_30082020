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

    describe("and a user uploads a file", () => {
      test("The file should is uploaded", () => {
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
      describe("The user uploads an incorrect file type", () => {
        test("file wasnt uploaded", () => {
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

          newBill.fileName = "test.pdf";

          submitBtn.addEventListener("click", handleSubmit);

          userEvent.click(submitBtn);
          expect(handleSubmit).toHaveBeenCalled();
        });
      });
    });

    describe("When I submit the form", () => {
      test("new bill has been submitted", () => {
        const html = NewBillUI();
        document.body.innerHTML = html;
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

        const testbill = {
          type: (screen.getByTestId("expense-type").value = "transports"),
          name: (screen.getByTestId("expense-name").value = "test"),
          amount: (screen.getByTestId("amount").value = 100),
          date: (screen.getByTestId("datepicker").value = "2021-01-01"),
          vat: (screen.getByTestId("vat").value = 20),
          pct: (screen.getByTestId("pct").value = 1),
          commentary: (screen.getByTestId("commentary").value = "text"),
        };
        const validBill = {
          type: "transports",
          name: "test",
          amount: 100,
          date: "2021-01-01",
          vat: 20,
          pct: 1,
          commentary: "text",
        };

        const newBill = new NewBill({
          document,
          onNavigate,
          firestore: null,
          localStorage: window.localStorage,
        });
        const form = screen.getByTestId("form-new-bill");
        const handleSubmit = jest.fn((e) => newBill.handleSubmit(e));

        const submitBtn = screen.getByTestId("form-new-bill");

        submitBtn.addEventListener("click", handleSubmit);

        userEvent.click(submitBtn);
        expect(testbill).toMatchObject(validBill);
        expect(handleSubmit).toHaveBeenCalled();
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
