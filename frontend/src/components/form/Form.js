

function Form({name, value}) {
    return (
        <div>

        <form>
            <h1>{name}</h1>
            <label htmlFor="name">Paciente: </label>
            <input name="name" id="name" placeholder="Digite o nome do paciente" type="text"></input>

            <label htmlFor="phone">Telefone: </label>
            <input name="phone" id="phone" placeholder="Digite o celular do paciente" type="tel"></input>


            <input type="submit" value={value}></input>
        </form>
       

            
        </div>
    )
}

export default Form;