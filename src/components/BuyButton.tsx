import * as AlertDialog from "@radix-ui/react-dialog";

const BuyButton = () => {
  const onBuyClick = () => {
    alert("Comprado!");
  };

  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger asChild>
        <button className="block w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-75 transition-opacity">
          Comprar
        </button>
      </AlertDialog.Trigger>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="backdrop-blur-sm inset-0 fixed flex justify-center items-center p-4">
            <AlertDialog.Content className=" bg-white rounded p-4 flex flex-col gap-5 shadow-lg">
                <AlertDialog.Title className="text-primary font-semibold text-xl">Comprar</AlertDialog.Title>
                <AlertDialog.Description>
                    ¿Estás seguro de que quieres comprar este producto?
                </AlertDialog.Description>
                <div className="flex justify-end gap-4">
                    <AlertDialog.Close asChild>
                        <button className="bg-gray-200 p-3 rounded hover:opacity-75 transition-opacity">Cancelar</button>
                    </AlertDialog.Close>
                    <AlertDialog.Close asChild>
                     <button onClick={onBuyClick} className="bg-primary text-white p-3 rounded-md hover:opacity-75 transition-opacity">
                        Ir a pagar
                     </button>
                    </AlertDialog.Close>
                </div>
            </AlertDialog.Content>
        </AlertDialog.Overlay>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
};

export default BuyButton;