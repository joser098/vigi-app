const ContinueAsGuestButtton = () => {
    const handleContinueAsGuest = async () => {
        alert("Continuar como invitado");
        window.history.back();
    }

  return (
    <button onClick={handleContinueAsGuest} className="w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-70 transition-opacity my-3 max-w-96 mt-7">
      Continuar como invitado
    </button>
  );
};

export default ContinueAsGuestButtton;
