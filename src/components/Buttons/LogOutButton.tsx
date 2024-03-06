const LogOutButton = () => {
    const handleLogOut = () => {
    window.localStorage.removeItem('check');
    window.document.cookie = 'check=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

    window.location.href = '/login';
  };

    return (
    <button className="text-primary" onClick={handleLogOut}>Cerrar sesión</button>
  );
};

export default LogOutButton;