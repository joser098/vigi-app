// Estaba desde hacía tiempo con un alert() adentro y un window.history.back():
// no llevaba a ningún lado porque no había a dónde ir. Ahora sí — /datos pide
// lo mínimo para despachar y sigue al pago.
//
// Es un <a> y no un <button> porque navega: así funciona con el clic del medio,
// con "abrir en pestaña nueva" y con el teclado, gratis.
const ContinueAsGuestButton = () => (
  <a
    href="/datos"
    className="flex h-14 w-full items-center justify-center rounded-full border-[1.5px] border-primary bg-white text-[15px] font-semibold text-primary transition-colors hover:bg-panel"
  >
    Comprar sin crear cuenta
  </a>
);

export default ContinueAsGuestButton;
