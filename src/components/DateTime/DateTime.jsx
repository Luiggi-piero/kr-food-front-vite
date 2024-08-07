function DateTime({
    date,
    options: {
        weekday = 'short',
        year = 'numeric',
        month = 'long',
        day = 'numeric',
        hour = 'numeric',
        minute = 'numeric',
        second = 'numeric'
    } = {}
}) {

    // el valor del idioma y la configuración regional del navegador del usuario
    var currentLocale = new Intl.DateTimeFormat().resolvedOptions().locale;

    /**
     *  formatea una fecha según una configuración regional específica 
     * y opciones de formato para diferentes partes de la fecha (como el 
     * día de la semana, el año, el mes, etc.)
     * 
     * devuelve esa fecha como una cadena de texto.
     */
    const getDate = () => (
        new Intl.DateTimeFormat(currentLocale, {
            weekday,
            year,
            month,
            day,
            hour,
            minute,
            second
        }).format(Date.parse(date))
    );

    return (
        <>
            {
                getDate()
            }
        </>
    )
}

export default DateTime