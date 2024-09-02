package com.example.demo.Controlador;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Dto.CitasPorMesEstadoDTO;
import com.example.demo.Modelo.Citas;
import com.example.demo.Modelo.Mascota;
import com.example.demo.Servicio.ServicioCitas;
import com.example.demo.Servicio.ServicioMascotas;

@RestController
@RequestMapping("/Citas")
@CrossOrigin(origins = "http://localhost:4200")
public class ControladorCitas {

	@Autowired
	private ServicioCitas sci;
	
	
	@GetMapping("/listar")
	public List<Citas> listarcitas(){
		return sci.listarcitas();
	}
	
    @PostMapping("/registrar")
    public Citas guardarCita(@RequestBody Citas cita) {
        return sci.guardarCita(cita);
    }
    
    @PutMapping("/actualizar")
    public Citas actualizarCita(@RequestBody Citas cita) {
        return sci.actualizarCita(cita);
    }
    
    @GetMapping("/buscar/{idcita}")
    public ResponseEntity<Citas> citaporid(@PathVariable Long idcita) {
        Optional<Citas> cita = sci.citaporid(idcita);
        return cita.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    
    @Autowired
    private ServicioMascotas mascotaService; // Servicio para obtener la entidad Mascota

    @GetMapping("/buscarpormascota/{idmascota}")
    public ResponseEntity<List<Citas>> historialPorMascota(@PathVariable Long idmascota) {
        Optional<Mascota> mascota = mascotaService.mascotaporid(idmascota);
        if (!mascota.isPresent()) {
            return ResponseEntity.notFound().build();
        }

        List<Citas> visitas = sci.historialPorMascota(mascota.get());

        // Filtrar las citas donde el estado es "completado"
        List<Citas> citasCompletadas = visitas.stream()
                                              .filter(cita -> "completado".equals(cita.getEstcita()))
                                              .collect(Collectors.toList());

        return citasCompletadas.isEmpty() ? ResponseEntity.notFound().build() : ResponseEntity.ok(citasCompletadas);
    }
    
    @GetMapping("/reportePorMesEstado")
    public List<CitasPorMesEstadoDTO> getReporteCitasPorMesEstado() {
        return sci.obtenerCitasPorMesEstado();
    }
}






