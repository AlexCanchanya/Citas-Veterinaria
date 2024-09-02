package com.example.demo.Interfaces;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.Modelo.Servicios;

public interface IServicio extends CrudRepository<Servicios, Long>{
	
	Optional<Servicios> findByidservicio (Long idservicio );

}
