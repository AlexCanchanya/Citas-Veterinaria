package com.example.demo.Controlador;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Modelo.HistorialMedico;
import com.example.demo.Modelo.Mascota;
import com.example.demo.Servicio.ServicioHistorialMedico;
import com.example.demo.Servicio.ServicioMascotas;



@RestController
@RequestMapping("/Historial")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorHistorialMedico {

	@Autowired
	private ServicioHistorialMedico shis;
	
	
	@GetMapping("/listar")
	public List<HistorialMedico> listarhistorialmedico(){
		return shis.listarhistorialmedico();
	}
	
	@GetMapping("/buscarporid/{idhistorial}")
    public ResponseEntity<HistorialMedico> historialporid(@PathVariable Long idhistorial) {
        Optional<HistorialMedico> historial = shis.historialporid(idhistorial);
        return historial.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
	
	
	
	@Autowired
    private ServicioMascotas mascotaService; // Servicio para obtener la entidad Mascota

    @GetMapping("/buscar/{idmascota}")
    public ResponseEntity<List<HistorialMedico>> historialPorMascota(@PathVariable Long idmascota) {
        Optional<Mascota> mascota = mascotaService.mascotaporid(idmascota);
        if (!mascota.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        List<HistorialMedico> visitas = shis.historialPorMascota(mascota.get());
        return visitas.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(visitas);
    }
}


