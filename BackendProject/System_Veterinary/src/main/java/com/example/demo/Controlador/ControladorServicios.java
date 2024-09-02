package com.example.demo.Controlador;

import java.util.List;
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

import com.example.demo.Modelo.Servicios;
import com.example.demo.Servicio.ServicioServicios;

@RestController
@RequestMapping("/Servicios")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorServicios {

	@Autowired
	private ServicioServicios ss;
	
	@GetMapping("/listar")
	public List<Servicios> listarservicios(){
		return ss.listarservicios();
	}
	
	@PostMapping("/registrar")
    public Servicios guardarServicio(@RequestBody Servicios servicio) {
        return ss.guardarServicio(servicio);
    }
    
    @PutMapping("/actualizar")
    public Servicios actualizarServicio(@RequestBody Servicios servicio) {
        return ss.actualizarServicio(servicio);
    }
    
    @GetMapping("/buscar/{idservicio}")
    public ResponseEntity<Servicios> servicioporid(@PathVariable Long idservicio) {
        Optional<Servicios> servicio = ss.servicioporid(idservicio);
        return servicio.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarServicio(@PathVariable Long id) {
        try {
            ss.eliminarServicio(id);
            return new ResponseEntity<>("Servicio eliminado exitosamente", HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }
}
