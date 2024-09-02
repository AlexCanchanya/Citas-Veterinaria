package com.example.demo.Controlador;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelo.Usuario;
import com.example.demo.Servicio.ServicioUsuarios;

@RestController
@RequestMapping("/Usuario")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorUsuario {

	@Autowired
	private ServicioUsuarios su;
	
	@GetMapping("/listar2")
	public List<Usuario> listarusuarios(){
		return su.listarusuarios();
	}
	
	@GetMapping("/buscarPorNick/{nickusuario}")
    public ResponseEntity<Usuario> buscarPorNickusuario(@PathVariable String nickusuario) {
        Optional<Usuario> usuario = su.buscarPorNickusuario(nickusuario);
        return usuario.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }
	
	@PostMapping("/registrar")
    public Usuario guardarUsuario(@RequestBody Usuario usuario) {
        return su.guardarUsuario(usuario);
    }
    
    @PutMapping("/actualizar")
    public Usuario actualizarUsuario(@RequestBody Usuario usuario) {
        return su.actualizarUsuario(usuario);
    }
    
    
    @GetMapping("/buscar2/{idusuario}")
    public ResponseEntity<Usuario> usuarioporid(@PathVariable Long idusuario) {
        Optional<Usuario> usuario = su.usuarioporid(idusuario);
        return usuario.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Map<String, String>> eliminarUsuario(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            su.eliminarUsuario(id);
            response.put("message", "usuario eliminado exitosamente");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }

    
 
}

