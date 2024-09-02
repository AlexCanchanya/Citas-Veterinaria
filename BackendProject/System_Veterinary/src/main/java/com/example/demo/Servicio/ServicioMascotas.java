package com.example.demo.Servicio;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Dto.MascotasPorMesDTO;
import com.example.demo.Interfaces.IMascota;
import com.example.demo.Modelo.Cliente;
import com.example.demo.Modelo.Mascota;

@Service
public class ServicioMascotas {

	@Autowired
	private IMascota imas;
	

	public List<Mascota> listarmascotas(){
		return (List<Mascota>) imas.findAll();
	}
	
	public Mascota guardarMascota(Mascota mascota) {
        return imas.save(mascota);
    }
	
	
	public Mascota actualizarMascota(Mascota mascota) {
        Optional<Mascota> mascotaExistente = imas.findById(mascota.getIdmascota());
        if (mascotaExistente.isPresent()) {
            Mascota _mascota = mascotaExistente.get();
            _mascota.setNommascota(mascota.getNommascota());
            _mascota.setEspmascota(mascota.getEspmascota());
            _mascota.setRazamascota(mascota.getRazamascota());
            _mascota.setEdadmascota(mascota.getEdadmascota());
            _mascota.setEstmascota(mascota.getEstmascota());
            
            _mascota.setSexomascota(mascota.getSexomascota());
            _mascota.setPesomascota(mascota.getPesomascota());
            _mascota.setAlimascota(mascota.getAlimascota());
            _mascota.setCastrado(mascota.getCastrado());
            _mascota.setFechareg(mascota.getFechareg());

            Cliente cliente = mascota.getCliente();
            _mascota.setCliente(cliente);

            return imas.save(_mascota);
        } else {
            throw new RuntimeException("Mascota no encontrada con ID " + mascota.getIdmascota());
        }
    }
	
	
	public Optional<Mascota> mascotaporid(Long idmascota) {
        return imas.findByidmascota(idmascota);
    }
	
	
	public Mascota eliminarMascota(Long idmascota) {
        Optional<Mascota> mascotaExistente = imas.findById(idmascota);
        if (mascotaExistente.isPresent()) {
            Mascota mascota = mascotaExistente.get();
            mascota.setEstmascota(false); // Cambiar el estado a eliminado
            return imas.save(mascota);
        } else {
            throw new RuntimeException("Mascota no encontrada con ID " + idmascota);
        }
    }
	
	public List<Mascota> historialPorCliente(Cliente cliente) {
        return imas.findByCliente(cliente);
    }
	
	
	//Graficos
		public List<MascotasPorMesDTO> obtenerMascotasPorMes() {
	        List<Object[]> results = imas.obtenerMascotasPorMes();
	        
	        return results.stream().map(result -> 
	            new MascotasPorMesDTO(
	                (Integer) result[0],  // mes
	                ((Number) result[1]).longValue() // totalMascotas
	            )
	        ).collect(Collectors.toList());
	    }
}






