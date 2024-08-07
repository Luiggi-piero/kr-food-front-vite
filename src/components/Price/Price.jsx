
/**
 * Componente que formatea el precio de acuerdo a su localización(locale) y una
 * moneda específica
 * @param {*} param0 
 * @returns HTML Precio formateado
 */
function Price({ price, locale = 'en-US', currency = 'USD' }) {

    const formatPrice = () => {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency
        }).format(price)
    }

    return (
        <span>{formatPrice()}</span>
    )
}

export default Price