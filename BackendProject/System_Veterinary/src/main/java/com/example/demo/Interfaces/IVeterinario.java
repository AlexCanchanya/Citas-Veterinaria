package com.example.demo.Interfaces;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.example.demo.Modelo.Veterinario;

public interface IVeterinario extends CrudRepository<Veterinario, Long>{

	Optional<Veterinario> findByidveterinario (Long idveterinario );

}
