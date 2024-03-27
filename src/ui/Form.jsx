import { createContext, useContext } from "react";
import { Heading } from "./Heading";

const FormContext = createContext();

export default function Form({ title, handleSubmit, onSubmit, children }) {
  return (
    <FormContext.Provider value={{ title }}>
      <>
        <form
          className="flex h-full flex-col items-stretch space-y-3 p-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </>
    </FormContext.Provider>
  );
}

function FormRow({ children, error, label, id }) {
  return (
    <div className="flex  flex-col space-y-2">
      <Heading
        as="label"
        htmlFor={id}
        size="md"
        className=" uppercase tracking-[1.00px]"
      >
        {label}
      </Heading>
      {children}
      <div className="text-xs font-medium text-red-500 sm:text-sm">{error}</div>
    </div>
  );
}
function Title({ children }) {
  return <header>{children}</header>;
}

function ButtonContainer({ children }) {
  return <div className="flex flex-col  gap-2">{children}</div>;
}

function FormFooter({ children }) {
  return (
    <footer className="text-center text-sm">
      <div>{children}</div>
    </footer>
  );
}
Form.Row = FormRow;
Form.Title = Title;
Form.ButtonContainer = ButtonContainer;
Form.Footer = FormFooter;
