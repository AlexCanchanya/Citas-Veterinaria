package com.example.demo.Seguridad;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class Configura {
	
	@Autowired
	UserDetailsService detalleusuario;
	
	@Autowired
	BCryptPasswordEncoder bc;
	
	@Bean
	protected AuthenticationManager autentica(AuthenticationConfiguration ac) throws Exception {
		return ac.getAuthenticationManager();
	}
	
	@Bean
	public SecurityFilterChain configurar(HttpSecurity http) throws Exception{
		AuthenticationManagerBuilder ab=http.getSharedObject(AuthenticationManagerBuilder.class);
				ab.userDetailsService(detalleusuario).passwordEncoder(bc);
				AuthenticationManager am=ab.build();
				return http
						
						.csrf((csrf) -> csrf.disable())
						
						.authenticationManager(am)
						.authorizeHttpRequests(
								(autoriza -> autoriza
										.requestMatchers(HttpMethod.POST,"/Login").permitAll()
										
										.requestMatchers(HttpMethod.GET,"/Usuario/listar").hasAnyRole("Administrador","Recepcionista","Cajero")
										.requestMatchers(HttpMethod.GET,"/Usuario/listar2").hasAnyRole("Administrador","Recepcionista","Cajero")
										.requestMatchers(HttpMethod.POST,"/Usuario/registrar").hasAnyRole("Administrador","Recepcionista","Cajero")
										.requestMatchers(HttpMethod.PUT,"/Usuario/actualizar").hasAnyRole("Administrador","Recepcionista","Cajero")
										.requestMatchers(HttpMethod.GET,"/Usuario/buscar2/{idusuario}").hasAnyRole("Administrador","Recepcionista","Cajero")
										.requestMatchers(HttpMethod.DELETE,"/Usuario/eliminar/{id}").hasAnyRole("Administrador","Recepcionista","Cajero")
										.requestMatchers(HttpMethod.GET,"/Usuario/buscarxnombre").hasAnyRole("Administrador","Recepcionista","Cajero")
										
									
									    .requestMatchers("/Cliente/**").hasAnyRole("Administrador","Recepcionista","Cajero")

									
										
									    .requestMatchers("/Mascota/**").hasAnyRole("Administrador","Recepcionista","Cajero")

									    
									    
									    .requestMatchers("/Servicios/**").hasAnyRole("Administrador","Recepcionista","Cajero")

										
									    .requestMatchers("/Veterinario/**").hasAnyRole("Administrador","Recepcionista","Cajero")
										
										
									    .requestMatchers("/Citas/**").hasAnyRole("Administrador","Recepcionista","Cajero")

										
									    .requestMatchers("/Visitas/**").hasAnyRole("Administrador","Recepcionista","Cajero")

									    .requestMatchers("/Comprobante/**").hasAnyRole("Administrador","Recepcionista","Cajero")
									    .requestMatchers("/Historial/**").hasAnyRole("Administrador","Recepcionista","Cajero")
									    
										.anyRequest().authenticated()
										.and()
										.addFilterBefore(new FiltrarLogin("/Login",am),
												UsernamePasswordAuthenticationFilter.class)
										.addFilterBefore(new FiltrarToken(detalleusuario),
												UsernamePasswordAuthenticationFilter.class)
										)
								)
						.sessionManagement((sessionManagement)->sessionManagement
								.sessionCreationPolicy(SessionCreationPolicy.STATELESS)).build();
	}
	
	@Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:4200")
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("*")
                        .exposedHeaders("Authorization")  // Exponer la cabecera de autorización solo para /Login
                        .allowCredentials(true);
            }
        };
    }
}
