package com.br.nlog.resources.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import com.br.nlog.services.exception.EmailAlreadyExistsException;
import com.br.nlog.services.exception.LikedPostException;
import com.br.nlog.services.exception.ObjectNotFoundException;



@ControllerAdvice
public class ResourceExceptionHandler {

	@ExceptionHandler(ObjectNotFoundException.class)
	public ResponseEntity<StandardError> objectNotFound(ObjectNotFoundException e, HttpServletRequest request) {

		HttpStatus status = HttpStatus.NOT_FOUND;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Not Found.", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}
	
	@ExceptionHandler(LikedPostException.class)
	public ResponseEntity<StandardError> likedPost(LikedPostException e, HttpServletRequest request) {

		HttpStatus status = HttpStatus.BAD_REQUEST;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Bad request.", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}
	
	@ExceptionHandler(EmailAlreadyExistsException.class)
	public ResponseEntity<StandardError> emailAlreadyExists(EmailAlreadyExistsException e, HttpServletRequest request) {

		HttpStatus status = HttpStatus.BAD_REQUEST;
		StandardError err = new StandardError(System.currentTimeMillis(), status.value(), "Bad request.", e.getMessage(), request.getRequestURI());
		return ResponseEntity.status(status).body(err);
	}
}