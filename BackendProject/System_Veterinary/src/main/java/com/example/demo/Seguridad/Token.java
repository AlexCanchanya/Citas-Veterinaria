package com.example.demo.Seguridad;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class Token {
	
	static final String firma="GiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTiGiSaTi";
	static void CrearToken(HttpServletResponse res, String username, String clave) {
		Key llave=new SecretKeySpec(Base64.getDecoder().decode(firma), SignatureAlgorithm.HS256.getJcaName()); 
	
		String token=Jwts.builder()
				.setSubject(username +"-"+clave)
				.setExpiration(new Date(System.currentTimeMillis() + (30*60000)))
				.signWith(llave)
				.compact();
		res.addHeader("Authorization", token);
	}
	
	static Authentication ValidarToken(HttpServletRequest req, UserDetailsService detalleusuario) {
		String token = req.getHeader("Authorization");
		Key llave=new SecretKeySpec(Base64.getDecoder().decode(firma), SignatureAlgorithm.HS256.getJcaName());
		if (token!=null) {
			String user=Jwts.parser()
					.setSigningKey(llave)
					.parseClaimsJws(token)
					.getBody()
					.getSubject();
			int pos=user.indexOf("-");
			String us=user.substring(0,pos); //estarer el nombre de usuairo
			String pa=user.substring(pos+1); // ezxtraer la copntrasenia
			
			UserDetails usdet=detalleusuario.loadUserByUsername(us);
			return new UsernamePasswordAuthenticationToken(us, pa, usdet.getAuthorities());
		}
		return null;
	}
}
