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


