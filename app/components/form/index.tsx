type FormProps = {
  nameOfInputs: string[];
  typeOfInputs: string[];
  formAction: string;
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
}: FormProps) {
  return (
    <form
      action=""
      className="flex flex-col gap-3 border-[1px] rounded-[2em] p-5"
    >
      <h1 className="text-[22px] font-bold text-center">{formAction}</h1>
      {nameOfInputs.map((name, index) => {
        return (
          <>
            <label className="w-full text-center">{name}</label>
            <input
              type={typeOfInputs[index]}
              className="rounded-[1em] p-1"
              name={name}
              onChange={(e) => {
                console.log(e.target.value);
                switch (name) {
                  case "Usuário":
                    updateFormProps({
                      ...formInputs,
                      username: e.target.value,
                    });
                    break;
                  case "Senha":
                    updateFormProps({
                      ...formInputs,
                      password: e.target.value,
                    });
                    break;
                  case "Email":
                    updateFormProps({
                      ...formInputs,
                      email: e.target.value,
                    });
                    break;
                }
              }}
            />
          </>
        );
      })}
      <div className="w-full flex justify-around">
        <button
          type="button"
          onClick={actionButton}
          className="border-[1px] rounded-[1em] px-3 py-1 hover:bg-black hover:transition-colors"
        >
          {formAction}
        </button>
        <button className="" type="button">
          Cancelar
        </button>
      </div>
    </form>
  );
}
