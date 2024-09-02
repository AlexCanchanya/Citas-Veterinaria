package com.example.demo.Interfaces;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.Modelo.Usuario;


public interface IUsuario extends CrudRepository<Usuario, Long> {

	Optional<Usuario> findBynickusuario (String nombre);
	
	Optional<Usuario> findByidusuario (Long idusuario );
	
	
	List<Usuario> findByNomusuarioContainingIgnoreCaseAndEstadoTrue(String nomusuario);
	List<Usuario> findByEstado(Boolean estado);
	

}