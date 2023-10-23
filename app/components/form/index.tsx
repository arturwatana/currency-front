type FormProps = {
  nameOfInputs: string[];
  typeOfInputs: string[];
  formAction: string;
  formSecondAction: string
  formSecondActionURl: string
  formInputs: UpdateFormProps;
  updateFormProps: React.Dispatch<React.SetStateAction<UpdateFormProps>>;
  actionButton: () => {};
};

type UpdateFormProps = {
  username: string;
  password: string;
  email?: string;
};

export default function Form({
  nameOfInputs,
  typeOfInputs,
  formAction,
  formInputs,
  actionButton,
  updateFormProps,
  formSecondAction,
  formSecondActionURl
}: FormProps) {
  return (
    <form
      action=""
      className="flex flex-col gap-3 border-[1px] border-black rounded-[2em] p-5 text-black sm:min-w-full h-[20em] items-center justify-around w-[50%] xl:w-[70%] lg:w-[85%] md:w-[80%] md:h-full  "
    >
      <h1 className="text-[22px] font-bold text-center">{formAction}</h1>
      <div className="flex flex-col gap-5 items-center w-full">
      {nameOfInputs.map((name, index) => {
        return (
          <div key={'keyForm' + index} className="flex w-[70%] items-center justify-around gap-2 md:w-full sm:flex-col ">
            <label className=" text-center" key={`label${index} min-w-[40%]`}>
              {name}
            </label>
            <input
              type={typeOfInputs[index]}
              className="rounded-[1em] p-2  text-black min-w-[60%] sm:w-[100%]"
              name={name}
              key={`input${index}`}
              onChange={(e) => {
                switch (name) {
                  case "Usuário: ":
                    updateFormProps({
                      ...formInputs,
                      username: e.target.value,
                    });
                    break;
                  case "Senha: ":
                    updateFormProps({
                      ...formInputs,
                      password: e.target.value,
                    });
                    break;
                  case "Email: ":
                    updateFormProps({
                      ...formInputs,
                      email: e.target.value,
                    });
                    break;
                }
              }}
            />
          </div>
        );
      })}
      </div>
      <div className="flex justify-around w-[70%] 2lg:w-full sm:flex-col sm:gap-4">
        <button
          type="button"
          onClick={actionButton}
          className="border-[1px] rounded-[1em] px-4 py-2 hover:bg-white hover:text-black  hover:transition-all md:px-6 md:py-4 sm:py-2"
          key={"btn1"}
        >
          {formAction}
        </button>
        <button className="border-[1px] rounded-[1em] px-4 py-2  hover:bg-white hover:text-black  hover:transition-all" type="reset" key="btn2">
          Cancelar
        </button>
      </div>
      <div className="w-full flex items-center justify-center">
        <a href={formSecondActionURl} className="hover:border-b-[1px] text-center " >{formSecondAction}</a>
      </div>
    </form>
  );
}
