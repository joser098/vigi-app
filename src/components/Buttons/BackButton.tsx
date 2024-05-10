const BackButton = () => {
    const onClick = () => {
        window.history.back()
    };

    return (
        <div className="px-4 mt-2 sm:px-8 max-w-[1180px] m-auto">
            <button onClick={onClick} className="text-primary text-sm font-semibold hover:underline">Volver</button>
        </div>
    )
};

export default BackButton;