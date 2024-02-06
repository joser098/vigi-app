const BuyButton = () => {
    const onBuyClick = () => {
        alert('Comprado!');
    }

    return (
        <button onClick={onBuyClick} className="block w-full bg-primary border-2 border-primary text-white p-3 rounded-md hover:opacity-75 transition-opacity">Comprar</button>
    );
};

export default BuyButton;

