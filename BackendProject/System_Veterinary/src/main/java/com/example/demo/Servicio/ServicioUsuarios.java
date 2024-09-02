package com.example.demo.Servicio;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Interfaces.IUsuario;
import com.example.demo.Modelo.Usuario;

@Service
public class ServicioUsuarios {

	@Autowired
	private IUsuario iusu;
	
	public List<Usuario> listarusuarios(){
		return (List<Usuario>) iusu.findAll();
	}

	public Usuario guardarUsuario(Usuario usuario) {
        return iusu.save(usuario);
    }
	
	public Optional<Usuario> buscarPorNickusuario(String nickusuario) {
        return iusu.findBynickusuario(nickusuario);
    }
	
	
	public Usuario actualizarUsuario(Usuario usuario) {
        Optional<Usuario> usuarioExistente = iusu.findById(usuario.getIdusuario());
        if (usuarioExistente.isPresent()) {
        	Usuario _usuario = usuarioExistente.get();
        	_usuario.setNomusuario(usuario.getNomusuario());
        	_usuario.setApeusuario(usuario.getApeusuario());
        	_usuario.setNickusuario(usuario.getNickusuario());
        	_usuario.setPassusuario(usuario.getPassusuario());
        	_usuario.setRol(usuario.getRol());
        	_usuario.setEstado(usuario.getEstado());

            return iusu.save(_usuario);
        } else {
            throw new RuntimeException("Usuario no encontrado con ID " + usuario.getIdusuario());
        }
    }
	
	
	public Optional<Usuario> usuarioporid(Long idusuario) {
        return iusu.findByidusuario(idusuario);
    }
	
	
	public Usuario eliminarUsuario(Long idusuario) {
        Optional<Usuario> usuarioExistente = iusu.findById(idusuario);
        if (usuarioExistente.isPresent()) {
        	Usuario usuario = usuarioExistente.get();
        	usuario.setEstado(false); // Cambiar el estado a eliminado
            return iusu.save(usuario);
        } else {
            throw new RuntimeException("Usuario no encontrado con ID " + idusuario);
        }
    }
	
}