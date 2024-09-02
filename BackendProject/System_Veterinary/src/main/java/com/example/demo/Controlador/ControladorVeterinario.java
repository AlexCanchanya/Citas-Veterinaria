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
import com.example.demo.Modelo.Veterinario;
import com.example.demo.Servicio.ServicioVeterinario;

@RestController
@RequestMapping("/Veterinario")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorVeterinario {

	@Autowired
	private ServicioVeterinario sv;
	
	@GetMapping("/listar")
	public List<Veterinario> listarveterinarios(){
		return sv.listarveterinarios();
	}
	
	@PostMapping("/registrar")
    public Veterinario guardarVeterinario(@RequestBody Veterinario veterinario) {
        return sv.guardarVeterinario(veterinario);
    }
    
    @PutMapping("/actualizar")
    public Veterinario actualizarVeterinario(@RequestBody Veterinario veterinario) {
        return sv.actualizarVeterinario(veterinario);
    }
    
    @GetMapping("/buscar/{idveterinario}")
    public ResponseEntity<Veterinario> veterinarioporid(@PathVariable Long idveterinario) {
        Optional<Veterinario> veterinario = sv.veterinarioporid(idveterinario);
        return veterinario.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
   
    
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Map<String, String>> eliminarVeterinario(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            sv.eliminarVeterinario(id);
            response.put("message", "veterinario eliminado exitosamente");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
}






