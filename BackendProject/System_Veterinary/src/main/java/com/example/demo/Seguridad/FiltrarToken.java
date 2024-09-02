package com.example.demo.Seguridad;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.filter.OncePerRequestFilter;


import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class FiltrarToken extends OncePerRequestFilter {
	
	
	UserDetailsService detalleus;
	
	public FiltrarToken(UserDetailsService detalleus) {
		super();
		this.detalleus = detalleus;
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		Authentication autentica=Token.ValidarToken((HttpServletRequest) request, detalleus);
		SecurityContextHolder.getContext().setAuthentication(autentica);
		filterChain.doFilter(request, response);	
	}

}	