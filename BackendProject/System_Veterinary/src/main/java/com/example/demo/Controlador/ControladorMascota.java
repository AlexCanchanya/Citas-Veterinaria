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

import com.example.demo.Dto.MascotasPorMesDTO;
import com.example.demo.Modelo.Cliente;
import com.example.demo.Modelo.Mascota;
import com.example.demo.Servicio.ServicioClientes;
import com.example.demo.Servicio.ServicioMascotas;

@RestController
@RequestMapping("/Mascota")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorMascota {
	
	@Autowired
	private ServicioMascotas sm;
    
    @PostMapping("/registrar")
    public Mascota guardarMascota(@RequestBody Mascota mascota) {
        return sm.guardarMascota(mascota);
    }
    
    @PutMapping("/actualizar")
    public Mascota actualizarMascota(@RequestBody Mascota mascota) {
        return sm.actualizarMascota(mascota);
    }
    
    @GetMapping("/buscar/{idmascota}")
    public ResponseEntity<Mascota> mascotaporid(@PathVariable Long idmascota) {
        Optional<Mascota> mascota = sm.mascotaporid(idmascota);
        return mascota.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Map<String, String>> eliminarMascota(@PathVariable Long id) {
        Map<String, String> response = new HashMap<>();
        try {
            sm.eliminarMascota(id);
            response.put("message", "cliente eliminado exitosamente");
            return new ResponseEntity<>(response, HttpStatus.OK);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
        }
    }
    
    
    @GetMapping("/listar")
	public List<Mascota> listarmascotas(){
		return sm.listarmascotas();
	}
    
    
    
    @Autowired
    private ServicioClientes clienteService;
    
    @GetMapping("/buscarporcliente/{idcliente}")
    public ResponseEntity<List<Mascota>> historialPorCliente(@PathVariable Long idcliente) {
        Optional<Cliente> cliente = clienteService.clienteporid(idcliente);
        if (!cliente.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        List<Mascota> visitas = sm.historialPorCliente(cliente.get());
        return visitas.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(visitas);
    }

    @GetMapping("/reportePorMes")
    public List<MascotasPorMesDTO> getReporteMascotasPorMes() {
        return sm.obtenerMascotasPorMes();
    }
}








