export function renderCode(code: string) {
    return `<div>
    <p>Un saludo </p>
        <p style="color: blue;"> Le hemos enviado este correo electrónico para que renicie su contraseña </p>
            <p> Para reiniciar su contraseña utilise este código </p>
                <p>${code}
    </p>
    <p> Si no ha solicitado reiniciar su contraseña, por favor ignore este correo.</p>
        <p> Gracias </p>
            <p> Equipo Offix </p>
                </div>`;


}

export function renderWelcome(code: string) {
    return `
    <p>Un saludo </p>
    <p style="color: blue;"> Le damos la bienvenida a la Plataforma Offix </p>
        <p> Por favor de click en el siquiente link para activar su usuario </p>
            <p>http://localhost:3000/api/security/activate/user/${code}
</p>
<p> Si no ha solicitado registrarse, por favor ignore este correo.</p>
    <p> Gracias </p>
        <p> Equipo Offix </p>
            </div>
    `
}


export function renderContact(name: string, email: string, text: string) {
    return `
    <p>Nombre: ${name}</p>
    <p>Email: ${email}</p>
    <p>${text}</p>
    `
}


