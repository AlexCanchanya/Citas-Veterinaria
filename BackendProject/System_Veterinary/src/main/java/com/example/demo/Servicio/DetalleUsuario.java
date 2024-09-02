package com.example.demo.Servicio;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Interfaces.IUsuario;
import com.example.demo.Modelo.Usuario;

@Service
public class DetalleUsuario implements UserDetailsService{

	@Autowired
	private IUsuario iusuario;
	
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
		Optional<Usuario> reg=iusuario.findBynickusuario(username);
		if(reg.isPresent()) {
			Usuario use=reg.get();
			return User.builder()
					.username(use.getNickusuario())
					.password(codifica().encode(use.getPassusuario()))
					.roles(use.getRol())

					.build();

		}
		else {
			throw new UsernameNotFoundException("Usuario no Existe ...!");
		}
	}
	
	@Bean
	public BCryptPasswordEncoder codifica() {
		return new BCryptPasswordEncoder();
	}
}
