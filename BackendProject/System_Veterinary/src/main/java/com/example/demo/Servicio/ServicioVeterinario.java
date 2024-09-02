package com.example.demo.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Interfaces.IVeterinario;
import com.example.demo.Modelo.Veterinario;

@Service
public class ServicioVeterinario {

	@Autowired
	private IVeterinario ivet;
	

	public List<Veterinario> listarveterinarios(){
		return (List<Veterinario>) ivet.findAll();
	}
	
	public Veterinario guardarVeterinario(Veterinario veterinario) {
        return ivet.save(veterinario);
    }
	
	
	public Veterinario actualizarVeterinario(Veterinario veterinario) {
        Optional<Veterinario> veterinarioExistente = ivet.findById(veterinario.getIdveterinario());
        if (veterinarioExistente.isPresent()) {
        	Veterinario _veterinaio = veterinarioExistente.get();
        	_veterinaio.setNomveterinario(veterinario.getNomveterinario());
        	_veterinaio.setApeveterinario(veterinario.getApeveterinario());
        	_veterinaio.setEspecialidadveterinario(veterinario.getEspecialidadveterinario());
        	_veterinaio.setTelfveterinario(veterinario.getTelfveterinario());
        	_veterinaio.setEstveterinario(veterinario.getEstveterinario());

            return ivet.save(_veterinaio);
        } else {
            throw new RuntimeException("Veterinario no encontrado con ID " + veterinario.getIdveterinario());
        }
    }
	
	public Optional<Veterinario> veterinarioporid(Long idveterinario) {
        return ivet.findByidveterinario(idveterinario);
    }
	
	
	public Veterinario eliminarVeterinario(Long idveterinario) {
        Optional<Veterinario> veterinarioExistente = ivet.findById(idveterinario);
        if (veterinarioExistente.isPresent()) {
        	Veterinario veterinario = veterinarioExistente.get();
        	veterinario.setEstveterinario(false); // Cambiar el estado a eliminado
            return ivet.save(veterinario);
        } else {
            throw new RuntimeException("Veterinario no encontrado con ID " + idveterinario);
        }
    }
}
