package com.example.demo.Seguridad;

import java.io.IOException;
import java.io.InputStream;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.example.demo.Modelo.CUsuario;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


public class FiltrarLogin extends AbstractAuthenticationProcessingFilter {
    private CUsuario usuario;

    protected FiltrarLogin(String url, AuthenticationManager autoriza) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(autoriza);
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
    		throws AuthenticationException, IOException, ServletException {
    	InputStream body=request.getInputStream();
    	usuario=new ObjectMapper().readValue(body, CUsuario.class);
    	
    	return getAuthenticationManager().authenticate(
    		new UsernamePasswordAuthenticationToken(
    				usuario.getNickusuario(), usuario.getPassusuario())
    			);
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
    		Authentication authResult) throws IOException, ServletException {
    	// TODO Auto-generated method stub
    	Token.CrearToken(response, authResult.getName(),usuario.getPassusuario());
    } 

}

