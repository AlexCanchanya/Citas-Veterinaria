package com.example.demo.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Interfaces.IServicio;
import com.example.demo.Modelo.Servicios;

@Service
public class ServicioServicios {

	@Autowired
	private IServicio iser;
	

	public List<Servicios> listarservicios(){
		return (List<Servicios>) iser.findAll();
	}
	
	public Servicios guardarServicio(Servicios servicio) {
        return iser.save(servicio);
    }
	
	public Servicios actualizarServicio(Servicios servicio) {
        Optional<Servicios> servicioExistente = iser.findById(servicio.getIdservicio());
        if (servicioExistente.isPresent()) {
        	Servicios _servicio = servicioExistente.get();
        	_servicio.setNombreservicio(servicio.getNombreservicio());
        	_servicio.setCostoservicio(servicio.getCostoservicio());
        	_servicio.setEstservicios(servicio.getEstservicios());

            return iser.save(_servicio);
        } else {
            throw new RuntimeException("Servicio no encontrado con ID " + servicio.getIdservicio());
        }
    }
	
	public Optional<Servicios> servicioporid(Long idservicio) {
        return iser.findByidservicio(idservicio);
    }
	
	
	public Servicios eliminarServicio(Long idservicio) {
        Optional<Servicios> servicioExistente = iser.findById(idservicio);
        if (servicioExistente.isPresent()) {
        	Servicios servicio = servicioExistente.get();
        	servicio.setEstservicios(false); // Cambiar el estado a eliminado
            return iser.save(servicio);
        } else {
            throw new RuntimeException("Servicio no encontrado con ID " + idservicio);
        }
    }
	
	
}







