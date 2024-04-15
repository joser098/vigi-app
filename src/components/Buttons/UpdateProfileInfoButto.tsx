import Loader from "../Icons/Loader";

const UpdateProfileInfoButton = ({isAnyFieldDirty, isLoading}: {isAnyFieldDirty: boolean, isLoading: boolean}) => {
  return (
    <fieldset className="flex justify-center items-center">
      <button
        id="Btn"
        className={`w-full flex justify-center bg-primary border-2 border-primary text-white p-3 rounded-md transition-opacity max-w-40 ${
          !isAnyFieldDirty ? "opacity-65" : "opacity-100 hover:opacity-75"
        }`}
        disabled={!isAnyFieldDirty}
      >
        {isLoading ? <Loader /> : "Actualizar"}
      </button>
      <p
        id="message"
        className="text-center bg-green-300 w-full py-2 rounded-sm hidden"
      >
        Datos actualizados ✅
      </p>
    </fieldset>
  );
};

export default UpdateProfileInfoButton;
