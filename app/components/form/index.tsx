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
      className="flex flex-col gap-3 border-[1px] rounded-[2em] p-5 text-white w-[40%] h-[20em] items-center justify-around  "
    >
      <h1 className="text-[22px] font-bold text-center">{formAction}</h1>
      <div className="flex flex-col gap-5 items-center w-full">
      {nameOfInputs.map((name, index) => {
        return (
          <div key={'keyForm' + index} className="flex w-[70%] items-center justify-around ">
            <label className=" text-center" key={`label${index}`}>
              {name}
            </label>
            <input
              type={typeOfInputs[index]}
              className="rounded-[1em] p-2  text-black"
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
      <div className="w-full flex justify-around">
        <button
          type="button"
          onClick={actionButton}
          className="border-[1px] rounded-[1em] px-4 py-2 hover:bg-black  hover:transition-all"
          key={"btn1"}
        >
          {formAction}
        </button>
        <button className="border-[1px] rounded-[1em] px-4 py-2  hover:bg-black  hover:transition-all" type="reset" key="btn2">
          Cancelar
        </button>
      </div>
      <div>
        <a href={formSecondActionURl} className="hover:border-b-[1px]" >{formSecondAction}</a>
      </div>
    </form>
  );
}
