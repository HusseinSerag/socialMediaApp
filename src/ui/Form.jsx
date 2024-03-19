import { createContext, useContext } from "react";

const FormContext = createContext();

export default function Form({ title, handleSubmit, onSubmit, children }) {
  return (
    <FormContext.Provider value={{ title }}>
      <div className="border-lg w-[80%] max-w-[600px] rounded border-[1px] border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300">
        <form className="space-y-3 p-4" onSubmit={handleSubmit(onSubmit)}>
          {children}
        </form>
      </div>
    </FormContext.Provider>
  );
}

function FormRow({ children, error, label, id }) {
  return (
    <div className="flex flex-col space-y-2">
      <label htmlFor={id} className=" text-sm font-medium sm:text-lg">
        {label}
      </label>
      {children}
      <div className="text-xs font-medium text-red-500 sm:text-sm">{error}</div>
    </div>
  );
}
function Title() {
  const { title } = useContext(FormContext);
  return (
    <h1 className="text-center text-lg font-semibold sm:text-2xl">{title}</h1>
  );
}

function ButtonContainer({ children }) {
  return <div className="flex justify-end gap-2">{children}</div>;
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
