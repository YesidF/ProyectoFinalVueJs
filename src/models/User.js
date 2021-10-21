import Perfil from './Perfil'
import Rol from './Rol'
class User{
    constructor(nombre, apellidos, genero, telefono,email, password, perfil, rol){
        this.perfil= new Perfil(perfil)
        this.rol= new Rol(rol)
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.telefono=telefono;
        this.genero=genero;
        this.email=email;
        this.password=password;
    }
}

export default User;