package com.example.demo.Servicio;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Dto.CitasPorMesEstadoDTO;
import com.example.demo.Interfaces.ICitas;
import com.example.demo.Modelo.Citas;
import com.example.demo.Modelo.Cliente;
import com.example.demo.Modelo.Mascota;
import com.example.demo.Modelo.Servicios;
import com.example.demo.Modelo.Usuario;
import com.example.demo.Modelo.Veterinario;


@Service
public class ServicioCitas {

	@Autowired
	private ICitas icit;
	

	public List<Citas> listarcitas(){
		return (List<Citas>) icit.findAll();
	}
	
	
	
	 public Citas guardarCita(Citas cita) {
        return icit.save(cita);
    } 
	 
	public Citas actualizarCita(Citas cita) {
        Optional<Citas> citaExistente = icit.findById(cita.getIdcita());
        if (citaExistente.isPresent()) {
        	Citas _cita = citaExistente.get();
        	_cita.setFechacita(cita.getFechacita());
        	_cita.setHoracita(cita.getHoracita());
        	_cita.setObservaciones(cita.getObservaciones());
        	_cita.setEstcita(cita.getEstcita());

            Cliente cliente = cita.getCliente();
            _cita.setCliente(cliente);
            
            Mascota mascota = cita.getMascotas();
            _cita.setMascotas(mascota);
            
            Veterinario veterinario = cita.getVeterinario();
            _cita.setVeterinario(veterinario);
            
            Usuario usuario = cita.getUsuario();
            _cita.setUsuario(usuario);
            
            Servicios servicio = cita.getServicios();
            _cita.setServicios(servicio);
         
            return icit.save(_cita);
        } else {
            throw new RuntimeException("Mascota no encontrada con ID " + cita.getIdcita());
        }
    }
	
	
	public Optional<Citas> citaporid(Long idcita) {
        return icit.findByidcita(idcita);
    }
	
	public List<Citas> historialPorMascota(Mascota mascota) {
        return icit.findByMascotas(mascota);
    }
	
	public List<CitasPorMesEstadoDTO> obtenerCitasPorMesEstado() {
        List<Object[]> results = icit.obtenerCitasPorMesEstado();
        
        return results.stream().map(result -> 
            new CitasPorMesEstadoDTO(
                (Integer) result[0],  // mes
                (String) result[1],   // estcita
                ((Number) result[2]).longValue() // totalCitas
            )
        ).collect(Collectors.toList());
    }
}


