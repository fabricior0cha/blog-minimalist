package com.br.nlog.security;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

public class JWTAuthorizationFilter extends BasicAuthenticationFilter {

	
	private JWTUtil jwtUtil;
	
	private UserDetailsService detailsService;
	
	public JWTAuthorizationFilter(AuthenticationManager authenticationManager, JWTUtil jwtUtil, 
			UserDetailsService detailsService) {
		super(authenticationManager);
		this.jwtUtil = jwtUtil;
		this.detailsService = detailsService;
		
	}
	
	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, 
			FilterChain chain) throws IOException, ServletException{
		String header = request.getHeader("Authorization");
		if(header != null && header.startsWith("Bearer ")) {
			UsernamePasswordAuthenticationToken auth = getAuthentication(request, header.substring(7));
			if(auth != null) {
				SecurityContextHolder.getContext().setAuthentication(auth);
			}
		}
		chain.doFilter(request, response);
	}

	private UsernamePasswordAuthenticationToken getAuthentication(HttpServletRequest request, String token) {
		if(jwtUtil.validToken(token)) {
			String username = jwtUtil.getUserName(token);
			UserDetails user = detailsService.loadUserByUsername(username);
			return new UsernamePasswordAuthenticationToken(user, null, new ArrayList<>());
		}
		return null;
	}

}
